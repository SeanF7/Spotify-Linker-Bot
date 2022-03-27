import { BaseCommandInteraction, Client } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { Command } from "../Command";
import api from "../api";
import { state } from "../store";

export const LinkArtist: Command = {
  name: "linkartist",
  description: "Returns a spotify link to the entered artist",
  type: "CHAT_INPUT",
  options: [
    {
      name: "query",
      description: "Name of the artist or their songs or albums",
      type: ApplicationCommandOptionTypes.STRING,
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    let query: string = interaction.options.get("query").value.toString();
    let link: string;
    await api
      .get("https://api.spotify.com/v1/search?q=" + query + "&type=artist", {
        params: { limit: 1, offset: 0 },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => (link = resp.data.artists.items[0].external_urls.spotify))
      .catch((error) => {
        link = "There was an error getting the artist";
        console.error(error);
      });

    await interaction.followUp({
      ephemeral: true,
      content: link,
    });
  },
};
