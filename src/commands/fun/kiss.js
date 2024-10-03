module.exports = {
  name: "kiss",
  description: "gives a kiss to someone",
  cooldown: 5,
  category: "INTERACTIONS",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<user>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        description: "user to kiss",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.safeReply(`Please mention a user to kiss.`);
    }
    const response = await getKiss(user);
    return message.safeReply(response);
  },

  async interactionRun(interaction) {
    const user = interaction.options.getUser("user");
    const response = await getKiss(user);
    await interaction.followUp(response);
  },
};

async function getKiss(user) {
  const response = await getJson("https://some-random-api.com/animu/kiss");
  if (!response.success) return MESSAGES.API_ERROR;

  const imageUrl = response.data?.image;
  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.TRANSPARENT)
    .setImage(imageUrl)
    .setDescription(`You kissed ${user.tag}!`)
    .setFooter({ text: `Requested by ${interaction.user.tag}` });

  return { embeds: [embed] };
}
