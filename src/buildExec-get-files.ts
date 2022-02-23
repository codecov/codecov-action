import * as glob from "@actions/glob";

// This is in a separate file so that it can be mocked in tests
export const getFilesByGlobs = async (files: string) => {
  const globber = await glob.create(files.split(",").join("\n"));
  return await globber.glob();
};
