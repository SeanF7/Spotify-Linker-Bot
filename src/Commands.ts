import { Command } from "./Command";
import { LinkSong } from "./Commands/LinkSong";
import { LinkAlbum } from "./Commands/LinkAlbum";
import { LinkArtist } from "./Commands/LinkArtist";

// Array containing all of the commands the bot has
export const Commands: Command[] = [LinkSong, LinkAlbum, LinkArtist];
