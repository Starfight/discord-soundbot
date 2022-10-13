import { Message } from 'discord.js';
import fetch from 'node-fetch';

import Command from '../base/Command';

export class GaucheDroiteCommand extends Command {
  public readonly triggers = ['gd', 'gauchedroite'];
  public readonly usage = 'Usage: !gauchedroite <words>';
  public readonly numberOfParameters = 1;

  public run(message: Message, params: string[]) {
    if (params.length < this.numberOfParameters) {
      message.channel.send(this.usage);
      return;
    }

    (async () => {
      const response = await fetch('https://degaucheoudedroite.delemazure.fr/api.php', {
        body: JSON.stringify({ input: params.join(' ') }),
        method: 'post'
      });
      if (!response.ok) {
        message.channel.send(`${params.join(' ')} ? je n'en sais rien, le site à passé l'arme à gauche.`);
      } else {
        const result = await response.json();
        message.channel.send(`${params.join(' ')} c'est ${result.data.trim().toLowerCase()}`);
      }
    })();

  }
}
