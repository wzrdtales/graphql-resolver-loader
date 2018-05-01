const glob = require("glob");
const _ = require("lodash");
const Path = require("path");

module.exports = (server, options) => {
  const globOptions = {
    nodir: true,
    strict: true,
    cwd: options.cwd || process.cwd(),
    ignore: options.ignore
  };
  const resolvers = glob.sync(options.resolvers);

  return resolvers
    .map(resolver => Path.join(globOptions.cwd, resolver))
    .reduce((obj, resolver) => _.merge(obj, require(resolver)(server)), {});
};
