module.exports = function runBuildIfNeeded(context, app, branch) {
  const author = context.actor;
  const { platform, jiraIssueCodes, changelog, stagingUrl } = parseContext(
    context,
    branch
  );

  if (platform == "both") {
    triggerBuild(
      branch,
      buildConfigId(app, "ios"),
      author,
      jiraIssueCodes[0],
      changelog,
      stagingUrl
    );
    triggerBuild(
      branch,
      buildConfigId(app, "android"),
      author,
      jiraIssueCodes[0],
      changelog,
      stagingUrl
    );
  } else {
    triggerBuild(
      branch,
      buildConfigId(app, platform),
      author,
      jiraIssueCodes[0],
      changelog,
      stagingUrl
    );
  }
};

function parseContext(context, branch) {
  const commentBody = context.payload.comment.body;
  const prTitle = context.payload.issue?.title;

  const jiraIssueRegex = /[A-Za-z]+-\d+/;

  const platform = commentBody.split(" ")[1].toLowerCase();

  assertPlatfrom(platform);

  const jiraIssueCodes =
    commentBody.match(jiraIssueRegex) ||
    prTitle?.match(jiraIssueRegex) ||
    branch.match(jiraIssueRegex) ||
    [];
  const keyword = `/internal ${platform}`;
  const regex = new RegExp(`${keyword}\\s+(.*)`, "i");
  const match = commentBody.match(regex);
  const changelog = match
    ? match[1].trim().replace(/"/g, "&quot;")
    : jiraIssueCodes[0] || branch;

  // Extract staging server URL
  const stagingRegex = /staging[0-9]+\.\w+\.\w+/;
  const stagingMatch = commentBody.match(stagingRegex);
  const stagingUrl = stagingMatch ? stagingMatch[0] : null;

  return { platform, jiraIssueCodes, changelog, stagingUrl };
}

function triggerBuild(
  branch,
  buildConfigId,
  author,
  jiraTaskId,
  changelog,
  stagingUrl
) {
  checkRequiredEnvVariables();

  const teamcityServerUrl = process.env.TEAMCITY_SERVER_URL;
  const teamcityApiToken = process.env.TEAMCITY_API_TOKEN;
  const cfClientId = process.env.CF_CLIENT_ID;
  const cfClientSecret = process.env.CF_CLIENT_SECRET;

  const https = require("https");

  const data = buildTeamcityDataXML(
    branch,
    buildConfigId,
    jiraTaskId,
    changelog,
    author,
    stagingUrl
  );

  const options = {
    hostname: teamcityServerUrl.replace(/^https?:\/\//, ""),
    path: "/app/rest/buildQueue",
    method: "POST",
    headers: {
      Authorization: `Bearer ${teamcityApiToken}`,
      "CF-Access-Client-Id": `${cfClientId}`,
      "CF-Access-Client-Secret": `${cfClientSecret}`,
      "Content-Type": "application/xml",
      "CSRF-workaround": "true",
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    res.on("end", () => {
      console.log("Build triggered successfully!");
    });
  });

  req.on("error", (error) => {
    throw new Error("Error occurred while triggering the build:");
  });

  req.write(data);
  req.end();
}

const buildConfigId = (app, platform) => {
  if (app == "swt") {
    switch (platform) {
      case "ios":
        return "SweatcoinMobile_InternalIOS";
      case "android":
        return "SweatcoinMobile_InternalAndroid";
      default:
        throw new Error("Invalid platform value");
    }
  } else if (app == "wallet") {
    switch (platform) {
      case "ios":
        return "WalletMobile_InternalIOS";
      case "android":
        return "WalletMobile_InternalAndroid";
      default:
        throw new Error("Invalid platform value");
    }
  } else {
    throw new Error(
      'Invalid app value. It should be either "swt" or "wallet".'
    );
  }
};

function checkRequiredEnvVariables() {
  const requiredEnvVariables = [
    "TEAMCITY_SERVER_URL",
    "TEAMCITY_API_TOKEN",
    "CF_CLIENT_ID",
    "CF_CLIENT_SECRET",
  ];

  for (const envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

function assertPlatfrom(platform) {
  if (platform !== "ios" && platform !== "android" && platform !== "both") {
    throw new Error(
      'Invalid platform value. It should be either "ios", "android", or "both".'
    );
  }
}

function buildTeamcityDataXML(
  branch,
  buildConfigId,
  jiraTaskId,
  changelog,
  author,
  stagingUrl
) {
  return `<build branchName="${branch}">
    <buildType id="${buildConfigId}"/>
    <properties>
      <property name="env.JIRA_TASK_ID" value="${jiraTaskId}"/>
      <property name="env.RELEASE_NOTES" value="${changelog}"/>
      <property name="env.AUTHOR" value="${author}"/>
      ${
        stagingUrl
          ? '<property name="env.STAGING_API_SERVER" value="' +
            stagingUrl +
            '"/>'
          : ""
      }
    </properties>
  </build>`;
}
