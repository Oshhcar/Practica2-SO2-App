export interface ProcInterface{
    nombre?: string,
    pid?: number,
    usuario?: number,
    estado?: string,
    hijos?: ProcInterface[]
}