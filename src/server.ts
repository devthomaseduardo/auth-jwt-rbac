import "dotenv/config";
import Fastify from "fastify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma.js";

const app = Fastify({
  logger: true,
});

const port = Number(process.env.PORT ?? 3334);
const host = process.env.HOST ?? "0.0.0.0";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

if (!jwtAccessSecret) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
};

type LoginBody = {
  email?: string;
  password?: string;
};

app.get("/health", async () => {
  return {
    status: "ok",
    service: "auth-jwt-rbac",
    timestamp: new Date().toISOString(),
  };
});

app.post("/auth/register", async (request, reply) => {
  const body = request.body as RegisterBody;

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!name || !email || !password) {
    return reply.status(400).send({
      error: "name, email and password are required",
    });
  }

  if (!email.includes("@")) {
    return reply.status(400).send({
      error: "invalid email",
    });
  }

  if (password.length < 8) {
    return reply.status(400).send({
      error: "password must have at least 8 characters",
    });
  }

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return reply.status(409).send({
      error: "email already registered",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return reply.status(201).send({
    user,
  });
});

app.post("/auth/login", async (request, reply) => {
  const body = request.body as LoginBody;

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return reply.status(400).send({
      error: "email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return reply.status(401).send({
      error: "invalid credentials",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return reply.status(401).send({
      error: "invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    jwtAccessSecret,
    {
      expiresIn: "15m",
    },
  );

  return reply.status(200).send({
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

async function start() {
  try {
    await app.listen({
      port,
      host,
    });

    console.log(`API running on http://${host}:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
