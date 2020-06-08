'use babel';

export default {
  quickAction: {
    title: "Quick Action",
    type: "object",
    properties: {
      build: {
        title: "Trigger build",
        type: "boolean",
        default: true
      },
      upload: {
        title: "Upload project",
        type: "boolean",
        default: true
      },
      terminal: {
        title: "Open terminal",
        type: "boolean",
        default: true
      }
    }
  },
  build: {
    title: "Build Options",
    type: "object",
    description: "Configure how PROS builds projects",
    properties: {
      cmd: {
        title: "Build Command",
        type: "string",
        default: "build-compile-commands",
        description: "Command to invoke when running Make",
        enum: [
          {
            value: "build-compile-commands",
            description: "Use PROS CLI Make wrapper and update cquery index (default)"
          },
          {
            value: "build",
            description: "Use PROS CLI Make wrapper but don't update cquery index"
          },
          {
            value: "make",
            description: "Build projects using the Make executable directly"
          }
        ]
      },
      buildAction: {
        title: "Configurable Build Action",
        description: "Set the rule to use with the pros:build command",
        type: "string",
        default: "",
        enum: [
          {
            value: "",
            description: "Use the default rule defined in the project Makefile (default)"
          },
          {
            value: "quick",
            description: "Use the 'quick' rule defined in the project Makefile"
          },
          {
            value: "clean",
            description: "Clean the project using the 'clean' rule defined in the Makefile"
          },
          {
            value: "all",
            description: "Use the 'all' rule defined in the project Makefile"
          }
        ]
      },
      addToToolbar: {
        title: "Add Build commands to tool-bar",
        type: "boolean",
        default: true
      }
    }
  },
  welcome: {
    title: "Welcome Page",
    type: "object",
    properties: {
      enabled: {
        title: "Show on Startup",
        type: "boolean",
        default: true
      }
    }
  },
  googleAnalytics: {
    title: "Google Analytics",
    type: "object",
    properties: {
      enabled: {
        title: "Enable Google Analytics",
        description: "If set to \'true,\' you help us to understand and better cater to our user-base by sending us information about the size, relative geographic area, and general activities of the people using PROS.",
        type: "boolean",
        default: true
      }
    }
  }
};
