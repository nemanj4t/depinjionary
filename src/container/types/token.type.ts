import { Constructable } from "./constructable.type";

export type Token = string | typeof Symbol | Constructable;
