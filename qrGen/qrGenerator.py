import qrcode

img = qrcode.make("https://allmypurplefeelings.whattheduck.club/")
img.save("qr.png")


# import csv

# with open("Edit_Ath.csv", mode="r") as file:
#     csvFile = csv.reader(file)
#     for lines in csvFile:
#         path = "./Error"
#         if lines[0] == "placeholder" or lines[0] == "\ufeffplaceholder":
#             continue
#         elif lines[0].split("-")[0] == "0151":
#             path = "./NewAth/KMUTNB"
#         elif lines[0].split("-")[0] == "0152":
#             path = "./NewAth/KMUTT"
#         elif lines[0].split("-")[0] == "0153":
#             path = "./NewAth/KMITL"
#         id = str(lines[0])
#         name = str(lines[1]) + " " + str(lines[2])
#         _name = name.replace(" ", "_")

#         img = qrcode.make(
#             {
#                 "id": id,
#                 "name": name,
#             }
#         )
# print(path + "/" + id + "_" + _name + ".png")
# img.save(path + "/" + id + "_" + _name + ".png")
