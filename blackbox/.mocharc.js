module.exports = {
    extension: ["ts"],
    require: "ts-node/register",
    spec: "src/__tests__/*.spec.ts",
    package: "./package.json",
    reporter: "spec",
    timeout: 15000,
    slow: 2000,
    exit: true,
    "use-strict": true,
    "enable-source-maps": true,
};
