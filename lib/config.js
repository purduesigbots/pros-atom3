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
    title: "Build Provider",
    type: "object",
    description: "Configure how PROS builds projects",
    properties: {
      cmd: {
        title: "Build Command",
        type: "array",
        default: ["prosv5", "build-compile-commands", "--"],
        description: "Command to invoke when running Make",
        enum: [
          {
            value: ["prosv5", "build-compile-commands", "--"],
            description: "Use PROS CLI Make wrapper and update cquery index (default)"
          },
          {
            value: ["prosv5", "make", "--"],
            description: "Use PROS CLI Make wrapper but don't update cquery index"
          },
          {
            value: ["make"],
            description: "Build projects using the Make executable directly"
          }
        ]
      },
      useMake: {
        title: "Use Make to parse Makefile targets",
        type: "boolean",
        default: true
      },
      addToToolbar: {
        title: "Add Build commands to tool-bar",
        type: "boolean",
        default: true
      }
    }
  }
};
