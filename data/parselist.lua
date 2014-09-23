
io.write("Filename: ")
filename = io.read("*l")
file = io.open(filename, "r")
out = io.open(filename..".json", "w")

out:write("{\n  \"words\": [\n    ")

function clean(s)
  return s:lower():gsub("Ä", "ä"):gsub("Ö", "ö"):gsub("Å", "å"):gsub("%p", "")
end

for line in file:lines() do
  line = clean(line)
  if(line:len() > 3) then
    out:write("\""..clean(line).."\",\n    ")
  end
end

out:seek("cur", -6)
out:write("\n  ]\n}")

out:close()
file:close()

