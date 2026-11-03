def solve(s, c):
    n = len(s)
    if n == 1:
        return 0 if s[0] == c else 1
    m = n // 2
    l = s[:m]
    r = s[m:]
    l_c = sum(1 for x in l if x != c)
    r_c = sum(1 for x in r if x != c)
    chera1 = l_c + solve(r, chr(ord(c) + 1))
    chera2 = r_c + solve(l, chr(ord(c) + 1))
    return min(chera1, chera2)
t = int(input())
for _ in range(t):
    n = int(input())
    s = input()
    print(solve(s, 'a'))