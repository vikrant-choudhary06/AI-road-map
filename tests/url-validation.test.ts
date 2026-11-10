import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isValidGithubRepoUrl } from "@/hooks/use-roadmap-progress";

describe("GitHub URL Validation Suite", () => {
  it("should accept valid standard GitHub repository URLs", () => {
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/torvalds/linux"),
      true
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/karpathy/micrograd"),
      true
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/user-name_123/repo.name-v2/"),
      true
    );
  });

  it("should reject non-GitHub URLs", () => {
    assert.strictEqual(
      isValidGithubRepoUrl("https://gitlab.com/user/repo"),
      false
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://bitbucket.org/user/repo"),
      false
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://malicious-github.com/user/repo"),
      false
    );
  });

  it("should reject malicious or malformed URL patterns", () => {
    assert.strictEqual(
      isValidGithubRepoUrl("javascript:alert(1)"),
      false
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/"),
      false
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/onlyuser"),
      false
    );
    assert.strictEqual(
      isValidGithubRepoUrl("https://github.com/user/repo/blob/main/code.py"),
      false
    );
    assert.strictEqual(isValidGithubRepoUrl(""), false);
    assert.strictEqual(isValidGithubRepoUrl(null), false);
    assert.strictEqual(isValidGithubRepoUrl(undefined), false);
  });
});
