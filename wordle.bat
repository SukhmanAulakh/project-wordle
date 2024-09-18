@echo off
start http://localhost:1234
ping 127.0.0.1 -n 1 > nul
npm --prefix D:\Code\Personal\JavaScript\ReactCourse\WordleProject\project-wordle run dev
ping 127.0.0.1 -n  > nul