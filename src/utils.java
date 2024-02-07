package src;

import java.io.File;
import java.util.Scanner;

public class utils {

	/**
	 Method to print win screen
	 */
	public static void gameWin() {
		clear();
		System.out.println("You Won!");
	}

	/**
	 Method to print lose screen
	 */
	public static void gameLose() {
		clear();
		System.out.println("You Lose!");
	}

	/**
	 Method to clear the terminal window
	 */
	public static void clear() {
		for(int i = 0; i < 56; i++) {
			System.out.println();
		}
	}

	/**
	 Method to get a Scanner from a specified filename
	 @param filename is a string denoting the filename
	 @return scan the finished scanner
	 */
	public static Scanner getScanner(String filename) {
		File inputFile = new File(filename);
		Scanner scan = null;

		try {
			scan = new Scanner(inputFile);
		}
		catch (java.io.FileNotFoundException e) {
			System.out.println("scanner error");
			System.exit(1);
		}
		return scan;
	}
}
