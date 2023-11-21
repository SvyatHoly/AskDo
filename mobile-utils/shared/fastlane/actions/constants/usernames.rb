USERNAMES = {
    "ch1e": "<@U03T917U894>",
    "i.sova": "<@U03RQQTE1EF>",
    "eilinwis": "<@U04CLFLJASV>",
    "suverev": "<@U02E9JXVB8R>",
    "natashazenkova": "<@U03RMUJBGE9>",
    "egorkhmelev": "<@U08JNK1A6>",
    "XeroX": "<@U2779MY93>",
    "Ilushkanama": "<@U58EYJZPD>",
    "froimsonm": "<@U03RQQTK1C3>",
    "hardworker": "<@U03RQQTE1EF>",
    "Andrusha1220": "<@U03RTAA6YJ0>",
    "Mylnikov1337Kirill": "<@U03SEJYAYP2>",
    "Rag0n": "<@U03SEJY457A>",
    "avegrv": "<@U03RJ95CHPY>",
    "VasyaFromRussia": "<@U03SEJYK2QG>",
    "pinball83": "<@U02L83JQX3K>",
    "foxum": "<@U03RQQT8XKM>",
    "dwnste": "<@U03RQQTRK0T>",
    "RMinibaev": "<@U03RJ95QA9L>",
    "wolferineaz": "<@U03RMUJKFN1>",
    "sergeich": "<@U03S3GN54QZ>",
    "piechart": "<@U03TCLMBWE9>",
    "augustach": "<@U04CAAEH4EQ>"
}

def slack_name(teamcity_username)
    slack_username = USERNAMES[teamcity_username.to_sym]
    slack_username || teamcity_username
end
