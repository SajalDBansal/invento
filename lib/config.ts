
type EnvVal = string | number | boolean;

function getEnv(
    key: string,
    defaultValue?: EnvVal,
    required: boolean = false
) {
    const value = process.env[key];

    if (!value) {
        if (required && defaultValue === null) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        return defaultValue;
    }

    return value;
}

interface Config {
    PORT: number;
    NODE_ENV: string,
    BCRYPT_HASH_SALT: number;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
}

const config: Config = {
    PORT: Number(getEnv("PORT", 3000)),
    NODE_ENV: getEnv("NODE_ENV", "development") as string,

    BCRYPT_HASH_SALT: Number(getEnv("BCRYPT_HASH_SALT", 20)),
    DATABASE_URL: getEnv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/invento") as string,

    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID") as string,
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET") as string,

    NEXTAUTH_URL: getEnv("NEXTAUTH_URL", "http://localhost:3000") as string,
    NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET", "password_nextauth") as string,

};

// Optional validation
function validateConfig(cfg: Config) {
    if (cfg.PORT <= 0) {
        throw new Error("PORT must be a positive number");
    }

    if (!cfg.DATABASE_URL) {
        throw new Error("DB_URL is required");
    }
}

validateConfig(config);

export default config;