import Code from "../structures/Code.class";
import Line from "../structures/Line.class";

const callingFork = new Code([
    new Line(
        "int main(int argc, char *argv[]) {",
        0,
        () => console.log('1', Math.random())
    ),
    new Line(
        "printf(\"hello world (pid:%d)\\n\", (int) getpid());",
        1,
        () => console.log('1', Math.random())
    ),
    new Line(
        "int rc = fork();",
        1,
        () => console.log('2', Math.random())
    ),
    new Line(
        "if (rc < 0) {",
        1,
        () => console.log('3', Math.random())
    ),
    new Line(
        "fprintf(stderr, \"fork failed\\n\");",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "exit(1);",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "} else if (rc == 0) {",
        1,
        () => console.log('3', Math.random())
    ),
    new Line(
        "printf(\"hello, I am child (pid:%d)\\n\", (int) getpid());",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "char *myargs[3];",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "myargs[0] = strdup(\\n\"wc\");",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "myargs[1] = strdup(\\n\"p3.c\");",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "myargs[2] = NULL;",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "execvp(myargs[0], myargs);",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "printf(\"this shouldn’t print out\");",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "} else {",
        1,
        () => console.log('3', Math.random())
    ),
    new Line(
        "int rc_wait = wait(NULL);",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "printf(\"hello, I am parent of %d (rc_wait:%d) (pid:%d)\\n\", rc, rc_wait, (int) getpid());",
        2,
        () => console.log('3', Math.random())
    ),
    new Line(
        "}",
        1,
        () => console.log('3', Math.random())
    ),
    new Line(
        "return 0;",
        1,
        () => console.log('3', Math.random())
    ),
    new Line(
        "}",
        0,
        () => console.log('3', Math.random())
    )
],
    "Calling fork() (p1.c)")

export default callingFork