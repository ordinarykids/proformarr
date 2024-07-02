import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.ts';
import Anthropic from "@anthropic-ai/sdk";
import { ANTHROPIC_API_KEY } from '$env/static/private';

export const load = async () => {
  const form = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data


    const anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 500,
      temperature: .3,
      messages: [
     
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "give me a detailed prorforma for the address [" + form.data.name + "]. Only return the HTML part of a svelte component. No script, no explanation"
            }
          ]
        }
      ]
    });
    console.log(msg);



    return message(form, msg);
  }
};





