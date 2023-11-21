FROM ruby:3.0.3 as ruby

RUN apt-get update > /dev/null \
  && apt-get install -y curl > /dev/null

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sS https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN echo "deb https://artifacts.crowdin.com/repo/deb/ /" | tee /etc/apt/sources.list.d/crowdin.list
RUN apt-get install -y apt-transport-https software-properties-common > /dev/null
RUN apt-get update > /dev/null \
  && apt-get install -y nodejs=16.* yarn crowdin3 ninja-build git openjdk-11-jdk locales zip > /dev/null \
  && apt-get clean > /dev/null \
  && rm -rf /var/lib/apt/lists /var/cache/apt

# Go is needed to build libssl & libcrypto
RUN curl -s -o go.tar.gz -L https://golang.org/dl/go1.17.linux-amd64.tar.gz
RUN tar xvf go.tar.gz && rm go.tar.gz
RUN mv go /usr/local

RUN mkdir /root/.ssh
RUN ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts

RUN mkdir /android
WORKDIR /android

ENV ANDROID_HOME="/android/android-sdk-linux" \
  SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip"
ENV ANDROID_CMDLINE_TOOLS="${ANDROID_HOME}/cmdline-tools/latest"

RUN mkdir ${ANDROID_HOME} /root/.android \
  && cd ${ANDROID_HOME} \
  && curl -s -o commandlinetools.zip $SDK_URL \
  && unzip commandlinetools.zip > /dev/null \
  && rm commandlinetools.zip > /dev/null \
  && mv ${ANDROID_HOME}/cmdline-tools ${ANDROID_HOME}/temp \
  && mkdir ${ANDROID_HOME}/cmdline-tools \
  && mv ${ANDROID_HOME}/temp ${ANDROID_CMDLINE_TOOLS} \
  && yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --licenses > /dev/null

ENV BUILD_TOOLS="33.0.2"
ENV PLATFORM="android-33"
ENV CMAKE_VERSION="3.10.2.4988404"
ENV NDK_VERSION="23.1.7779620"

RUN yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --install "build-tools;${BUILD_TOOLS}" > /dev/null
RUN yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --install "platforms;${PLATFORM}" > /dev/null
RUN yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --install "cmake;${CMAKE_VERSION}" > /dev/null
RUN yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --install "platform-tools" > /dev/null
RUN yes | ${ANDROID_CMDLINE_TOOLS}/bin/sdkmanager --install "ndk;${NDK_VERSION}" > /dev/null

ENV PATH="${ANDROID_CMDLINE_TOOLS}/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/build-tools/${BUILD_TOOLS}:${PATH}:/usr/local/go/bin"
ENV CMAKE_DIR="${ANDROID_HOME}/cmake/${CMAKE_VERSION}"
ENV NDK_DIR="${ANDROID_HOME}/ndk/${NDK_VERSION}"

RUN npm install -g firebase-tools detox-cli

RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8
