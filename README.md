#rock paper scissors

#importing modules
import random
import time

print("welcome to rock-paper-scissors")

#setting a variable for the while loop
x = 0

while x == 0:

    #asking the user for input
    c = input("choose:")
    c = str(c)

    #checking if the input is not anything else
    if c in ["rock", "paper", "scissors"]:
        print("computer is choosing...")

        #delaying the code to make it appear that the computer is thinking
        time.sleep(2)

        #a random choice for the computer
        cc = random.choice(["rock", "paper", "scissors"])
        print("computer chose", cc)

        #setting conditions for winning and losing
        if c == "rock":
            if cc == "paper":
                print("sorry, you lost!")
            elif cc == "scissors":
                print("congratulations, you won!")
            elif cc == "rock":
                print("it's a draw!")
        elif c == "paper":
            if cc == "paper":
                print("it's a draw")
            elif cc == "scissors":
                print("sorry, you lost!")
            elif cc == "rock":
                print("congratulations, you won!")
        elif c == "scissors":
            if cc == "paper":
                print("congratulations, you won!")
            elif cc == "scissors":
                print("it's a draw!")
            elif cc == "rock":
                print("sorry you lost!")

        #asking whether the user wants to play again
        a = input("enter y to play again, enter n to end the game: ")
        if a == "n":
            break
        else:
            continue

    #prompting the user to select rock, paper or scissors only
    else:
        print("please select rock, paper or scissors only")


print("thanks for playing!")
