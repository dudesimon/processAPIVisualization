import "./App.css"
import ProcessView from "./components/ProcessView"
import ProcessCard from "./components/ProcessCard"
import Code from "./structures/Code.class"
import Line from "./structures/Line.class"
import { useMemo, useState } from "react"

const App = () => {
    const [terminalOut, setTerminalOut] = useState([])
    const [isSplit, setIsSplit] = useState(false)
    const [parentCurrentLine, setParentCurrentLine] = useState(0)
    const [childCurrentLine, setChildCurrentLine] = useState(0)
    const [parentIsWaiting, setParentIsWaiting] = useState(false)
    const [isDone, setIsDone] = useState(false)


    const [processes, setProcesses] = useState([
        {
            pid: 1,
            startup: true,
            scriptName: "testingFork",
            fileName: "p1.c",
            returnFromFork: "N/A",
        }
    ])
    return (
        <>
            <div className="split">
                <div className="left">
                    <ProcessView codeBlock={
                        new Code([
                            new Line(
                                "int main(int argc, char *argv[]) {",
                                0,
                                () => { }
                            ),
                            new Line(
                                "printf(\"hello world (pid:%d)\\n\", (int) getpid());",
                                1,
                                () => setTerminalOut(prevTerminalOut => [
                                    ...prevTerminalOut,
                                    `hello world (pid:${processes[0].pid})`
                                ])
                            ),
                            new Line(
                                "int rc = fork();",
                                1,
                                () => {
                                    setProcesses(prevProcesses => {
                                        return [
                                            {
                                                ...prevProcesses[0],
                                                returnFromFork: 2,
                                            },
                                            {
                                                ...prevProcesses[0],
                                                pid: 2,
                                                startup: false,
                                                returnFromFork: 0,
                                            }
                                        ]
                                    })
                                    setIsSplit(true)
                                    setChildCurrentLine(2)
                                }
                            ),
                            new Line(
                                "if (rc < 0) {",
                                1,
                                () => {
                                    setParentCurrentLine(14)
                                    setChildCurrentLine(5)
                                }
                            ),
                            new Line(
                                "fprintf(stderr, \"fork failed\\n\");",
                                2,
                                () => {}
                            ),
                            new Line(
                                "exit(1);",
                                2,
                                () => {}
                            ),
                            new Line(
                                "} else if (rc == 0) {",
                                1,
                                () => {}
                            ),
                            new Line(
                                "printf(\"hello, I am child (pid:%d)\\n\", (int) getpid());",
                                2,
                                () => {
                                    setTerminalOut(prevTerminalOut => [
                                        ...prevTerminalOut,
                                        `hello, I am child (pid:${processes[1].pid})`
                                    ])
                                }
                            ),
                            new Line(
                                "char *myargs[3];",
                                2,
                                () => {}
                            ),
                            new Line(
                                "myargs[0] = strdup(\"testProgram\");",
                                2,
                                () => {}
                            ),
                            new Line(
                                "myargs[1] = strdup(\"Test Arg!\");",
                                2,
                                () => {}
                            ),
                            new Line(
                                "myargs[2] = NULL;",
                                2,
                                () => {}
                            ),
                            new Line(
                                "execvp(myargs[0], myargs);",
                                2,
                                () => {
                                    setProcesses(prevProcesses => {
                                        prevProcesses[1].scriptName = "testProgram"
                                        prevProcesses[1].fileName = "p2.c"

                                        return prevProcesses
                                    })
                                    setTerminalOut(prevTerminalOut => [
                                        ...prevTerminalOut,
                                        "Test Program Ran after exec() with argument: Test Arg!"
                                    ])
                                    setParentIsWaiting(false)
                                }
                            ),
                            new Line(
                                "printf(\"this shouldn’t print out\");",
                                2,
                                () => {
                                    setChildCurrentLine(-2)
                                    setIsSplit(false)
                                }
                            ),
                            new Line(
                                "} else {",
                                1,
                                () => {}
                            ),
                            new Line(
                                "int rc_wait = wait(NULL);",
                                2,
                                () => {
                                    setParentIsWaiting(true)
                                }
                            ),
                            new Line(
                                "printf(\"hello, I am parent of %d (rc_wait:%d) (pid:%d)\\n\", rc, rc_wait, (int) getpid());",
                                2,
                                () => {
                                    setTerminalOut(prevTerminalOut => [
                                        ...prevTerminalOut,
                                        `hello, I am parent of 2 (rc_wait:2) (pid:${processes[1].pid})`
                                    ])
                                }
                            ),
                            new Line(
                                "}",
                                1,
                                () => {}
                            ),
                            new Line(
                                "return 0;",
                                1,
                                () => {}
                            ),
                            new Line(
                                "}",
                                0,
                                () => {
                                    setParentCurrentLine(-1)
                                    setIsDone(true)
                                }
                            )
                        ],
                            "Calling fork(), exec(), and wait() (p1.c)")
                    } 
                        isSplit={isSplit} 
                        parentCurrentLine={parentCurrentLine} 
                        childCurrentLine={childCurrentLine}
                        setParentCurrentLine={setParentCurrentLine}
                        setChildCurrentLine={setChildCurrentLine}
                        parentIsWaiting={parentIsWaiting}
                        isDone={isDone}
                    />
                </div>
                <div className="right">
                    {
                        processes.map((process, index) => {
                            return <ProcessCard
                                key={`process-${index}`}
                                isSplit={isSplit}
                                pid={process.pid}
                                startup={process.startup}
                                scriptName={process.scriptName}
                                fileName={process.fileName}
                                returnResultFromFork={process.returnFromFork}
                            />
                        })
                    }
                    <div className="terminal">
                        <h2>Terminal Output</h2>
                        {
                            terminalOut.map((value, index) => {
                                return <p key={`terminal-${index}`}>{value}</p>
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default App
