#!/bin/bash

files=$(ls -tr | grep -E '^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}\.jpeg$')

count=1

echo "$files" | while IFS= read -r file; do
  # 获取文件扩展名
  extension="${file##*.}"

  # 生成新的文件名
  new_filename="${count}.${extension}"

  echo "Renaming $file "

  # 重命名文件
  mv "$file" "$new_filename"

  # 更新计数器
  count=$((count + 1))
done
