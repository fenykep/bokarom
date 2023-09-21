CC = gcc
CFLAGS = -Wall

# The name of your executable
TARGET = day_program

# Source files for your program
SRCS = proba.c

# Object files to be generated from source files
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) $(OBJS) -o $(TARGET)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

