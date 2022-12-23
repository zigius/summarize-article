#!/usr/bin/env node

"use strict";
import * as dotenv from "dotenv";
dotenv.config();
import yargs from "yargs";
import { Configuration, OpenAIApi } from "openai";

const argv = yargs(process.argv.slice(2)).command(
  "summarize",
  "summarize article",
  () => {},
  async (argv) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAPI_ACCESS_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Please extract 10 bullet points from the following article: ${argv["_"][1]}`;

    const model = "text-davinci-003";

    const response = await openai.createCompletion({
      prompt,
      model,
      temperature: 0.5,
      max_tokens: 250,
    });

    console.log(response.data.choices[0].text);
  }
).argv;
