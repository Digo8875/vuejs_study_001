import type ProjectI from "./ProjectI";

export default interface TaskI {
    durationSeconds: number,
    description: string,
    project: ProjectI,
    id: number
}