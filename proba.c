#include <stdio.h>
#include <string.h>

// Define a custom data type called "day" with a size of 40 bytes
struct day {
    char data[40];
};

// Function to save a day to a file
void saveDayToFile(const char *filename, const struct day *d) {
    FILE *file = fopen(filename, "wb");
    if (file == NULL) {
        perror("Error opening file");
        return;
    }
    fwrite(d, sizeof(struct day), 1, file);
    fclose(file);
}

// Function to open a file with a day extension and read it into a day variable
int openDayFromFile(const char *filename, struct day *d) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) {
        perror("Error opening file");
        return 0;
    }
    fread(d, sizeof(struct day), 1, file);
    fclose(file);
    return 1;
}

int main() {
    struct day myDay;

    // Initialize the "day" variable
    snprintf(myDay.data, sizeof(myDay.data), "This is a 40-byte day variable.");

    // Save the "day" to a file with the .day extension
    const char *filename = "myday.day";
    saveDayToFile(filename, &myDay);
    printf("Day saved to file: %s\n", filename);

    // Open a file with a .day extension and populate the "day" variable
    struct day loadedDay;
    if (openDayFromFile(filename, &loadedDay)) {
        printf("Loaded Day: %s\n", loadedDay.data);
    } else {
        printf("Failed to load Day from file.\n");
    }

    return 0;
}

