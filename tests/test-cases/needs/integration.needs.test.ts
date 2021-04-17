import {MockWriteStreams} from "../../../src/mock-write-streams";
import {handler} from "../../../src/handler";
import * as chalk from "chalk";

test("needs <build-job> --needs", async () => {
    const mockWriteStreams = new MockWriteStreams();
    await handler({
        cwd: "tests/test-cases/needs",
        job: "build-job",
        needs: true
    }, mockWriteStreams);

    const expected = [chalk`{blueBright test-job } {greenBright >} Test something`];
    expect(mockWriteStreams.stdoutLines).toEqual(expect.arrayContaining(expected));
});

test("needs-unspecified-job <build-job> --needs", async () => {
    const mockWriteStreams = new MockWriteStreams();
    try {
        await handler({
            cwd: "tests/test-cases/needs-unspecified-job",
            job: "test-job",
        }, mockWriteStreams);
    } catch (e) {
        expect(e.message).toBe(chalk`[ {blueBright invalid} ] jobs are needed by {blueBright test-job}, but they cannot be found`);
    }
});