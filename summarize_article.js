#!/usr/bin/env node

"use strict";
import * as dotenv from "dotenv";
dotenv.config();
import Configstore from "configstore";
import yargs from "yargs";
import { Configuration, OpenAIApi } from "openai";
const config = new Configstore("summarize-article");

const argv = yargs(process.argv.slice(2))
  .command(
    "set-api-token",
    "set-api-token",
    () => {},
    async (argv) => {
      config.set({ apiKey: argv["_"][1] });
    }
  )
  .command(
    "summarize",
    "summarize article",
    () => {},
    async (argv) => {
      const apiKey = config.get("apiKey");
      const configuration = new Configuration({
        apiKey: apiKey,
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
