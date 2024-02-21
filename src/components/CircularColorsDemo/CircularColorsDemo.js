"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
    { label: "red", value: "hsl(348deg 100% 60%)" },
    { label: "yellow", value: "hsl(50deg 100% 55%)" },
    { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
    const [isPaused, setIsPaused] = React.useState(false);
    const [timeElapsed, setTimeElapsed] = React.useState(0);
    const id = React.useId()
    // console.log(timeElapsed);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (isPaused) {
                return;
            }
            setTimeElapsed(curVal => curVal + 1); // usar currVal para no tener que declarar timeElapsed como dependencia -> effect resets on each rerender
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isPaused]);
    const selectedColor = COLORS[timeElapsed % COLORS.length];

    function handleTogglePlay() {
        setIsPaused(!isPaused);
    }

    function handleReset() {
        handleTogglePlay();
        setTimeElapsed(0);
    }

    return (
        <Card as="section" className={styles.wrapper}>
            <ul className={styles.colorsWrapper}>
                {COLORS.map((color, index) => {
                    const isSelected = color.value === selectedColor.value;

                    return (
                        <li className={styles.color} key={index}>
                            {isSelected && (
                                <motion.div
                                    layoutId={`${id}-outline`}
                                    className={styles.selectedColorOutline}
                                />
                            )}
                            <div
                                className={clsx(
                                    styles.colorBox,
                                    isSelected && styles.selectedColorBox
                                )}
                                style={{
                                    backgroundColor: color.value,
                                }}>
                                <VisuallyHidden>{color.label}</VisuallyHidden>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.timeWrapper}>
                <dl className={styles.timeDisplay}>
                    <dt>Time Elapsed</dt>
                    <dd>{timeElapsed}</dd>
                </dl>
                <div className={styles.actions}>
                    <button onClick={handleTogglePlay}>
                        {isPaused ? <Play /> : <Pause />}
                        <VisuallyHidden>
                            {isPaused ? "Play" : "Pause"}
                        </VisuallyHidden>
                    </button>
                    <button onClick={handleReset}>
                        <RotateCcw />
                        <VisuallyHidden>Reset</VisuallyHidden>
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default CircularColorsDemo;
