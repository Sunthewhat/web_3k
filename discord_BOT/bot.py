import discord
import os
from discord.ext import commands

TOKEN = "MTIwNTQyNzc5NTUzOTUyNTY1Mg.GJZ9Gd.KyJ8IXUrerIqq06SrLjLLIy_4eaEU3ySuTZu8c"
client = commands.Bot(command_prefix="!", intents=discord.Intents.all())


@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")


@client.command(name="deploy")
async def build(ctx):
    await ctx.send("Start deploying the website")
    output = await os.popen(
        "cd /home/sunthewhat/containers/web_3k && bash build.sh"
    ).read()
    await ctx.send("```bash\n" + output + "\n```")
    await ctx.send("Deployed the website")


@client.command(name="backendLogs")
async def backendLogs(ctx):
    output = await os.popen(
        "cd /home/sunthewhat/containers/web_3k && docker logs web_3kBackend"
    ).read()
    await ctx.send("```bash\n" + output + "\n```")


@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.errors.CheckFailure):
        await ctx.send("You do not have the correct role for this command.")


client.run(TOKEN)
