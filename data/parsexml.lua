
file = io.open("words.xml", "r")
line = file:read("*l")
out = io.open("words.json", "w")

function match(line)
  return line:match("<s>(%l+)</s>")
end

out:write("{\n  \"words\": [\n    ")

while(line) do
  local m = match(line)
  if(not line:find("%d") and m and m:len() < 12) then
    out:write("\""..m.."\",\n    ")
  end
  
  line = file:read("*l")

end

out:seek("cur", -6)
out:write("\n  ]\n}")

out:close()
file:close()
