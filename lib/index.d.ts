declare function credstashEnv(table: string, values?: any[], options?: {
    prefix?: string;
    isSetAll?: boolean;
    awsOpts?: object;
}): void;
export = credstashEnv;
