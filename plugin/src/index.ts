import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs";
import path from "path";

const COMPILE_OPTIONS_BLOCK = `
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        coreLibraryDesugaringEnabled true
    }
`;

const DESUGARING_DEPENDENCY = `coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4")`;
const JITPACK_REPO = `maven { url 'https://www.jitpack.io' }`;

const withCustomDesugarSupport: ConfigPlugin = (config) => {
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const appBuildGradlePath = path.join(
        config.modRequest.projectRoot,
        "android",
        "app",
        "build.gradle"
      );

      let buildGradle = fs.readFileSync(appBuildGradlePath, "utf8");

      // Add compileOptions inside android { ... }
      if (!buildGradle.includes("coreLibraryDesugaringEnabled true")) {
        buildGradle = buildGradle.replace(
          /android\s*{[^}]*}/s,
          (match) => match + COMPILE_OPTIONS_BLOCK
        );
      }

      // Add dependency
      if (!buildGradle.includes(DESUGARING_DEPENDENCY)) {
        buildGradle = buildGradle.replace(
          /dependencies\s*{([^}]*)}/s,
          (match, p1) => `dependencies {\n    ${DESUGARING_DEPENDENCY}\n${p1}}`
        );
      }

      fs.writeFileSync(appBuildGradlePath, buildGradle);

      return config;
    },
  ]);

  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const rootBuildGradlePath = path.join(
        config.modRequest.projectRoot,
        "android",
        "build.gradle"
      );

      let buildGradle = fs.readFileSync(rootBuildGradlePath, "utf8");

      if (!buildGradle.includes(JITPACK_REPO)) {
        buildGradle = buildGradle.replace(
          /allprojects\s*{[\s\S]*?repositories\s*{([\s\S]*?)}/,
          (match, p1) =>
            match.replace(p1, `${p1.trim()}\n        ${JITPACK_REPO}`)
        );
      }

      fs.writeFileSync(rootBuildGradlePath, buildGradle);

      return config;
    },
  ]);

  return config;
};

export default withCustomDesugarSupport;
