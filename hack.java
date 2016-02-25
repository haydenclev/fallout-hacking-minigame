/**
This class executes HACKING a java/terminal window replication of the 
popular Fallout 4 terminal hacking system.
Hayden Clevenger
Dec 12, 2015
*/

import java.io.File;
import java.util.Random;
import java.util.Scanner;

public class hack {

	//fields
	private static final int LINE = 20;
	private static final int ROW = 40;
	private static final int NUM_WORDS = 10;
	private static final int WORD_LEN = 4;

	 public static void main(String[] args) {

			Scanner scan = new Scanner(System.in);
			String choice = "y";

			//allowing user to continue
			while(choice == "y") {

				//running actual game
				int win = runGame();
//delete later
System.exit(1);

				//checking for win or loss
				if(win == 0)
					gameWin();

				else
					gameLose();

				//continue?
				System.out.println("continue? (y/n)");
				choice = scan.next();
				if(choice.equals("y") || choice.equals("n"))
					continue;
			}
				

		}

	/////////////////////
	//ACCESSORY METHODS//
	/////////////////////

	/**
	Method to run the actual game
	*/
	private static int runGame() {
		char[] grid = makeGrid();
		String[] words = makeWords();
		grid = inputWords(grid, words);

		//generating memory address values between columns
		int[] addresses = getAddresses();

		print(grid, addresses);

		//create words

		//create braces
		return 0;
	}

	/**
	Method to put the words in the grid
	@param grid is the game grid of ascii chars
	@param words is the String[] of words
	*/
	private static char[] inputWords(char[] grid, String[] words) {

		Random r = new Random();
		int spacing = (LINE * ROW) / NUM_WORDS;	//frequency of words

		for(int i = 0; i < NUM_WORDS; i++) {
			int region = r.nextInt(spacing - WORD_LEN);
			int place = (i * spacing) + region;
			for(int j = 0; j < WORD_LEN; j++) {
				grid[j+place] = words[i].charAt(j);
			}
		}
		return grid;
	}

	/**
	Method to create the array of words that appear in the grid
	@return words a String[] of words
	*/
	private static String[] makeWords() {
		Random r = new Random();
		String[] words = new String[NUM_WORDS];

		for(int i = 0; i < NUM_WORDS; i++) {
			Scanner scan = getScanner("dictionary/dict4.txt");
			int rand = r.nextInt(3900);
			for(int j = 0; j < rand; j++) {
				scan.nextLine();
			}
			words[i] = scan.next();
		}
		return words;
	}

	/**
	Method to greate the grid of random ascii values
	@return grid the game array of chars
	*/
	private static char[] makeGrid() {

		char[] grid = new char[ROW * LINE];

		Random r = new Random();

		//populating array
		for(int i = 0; i < LINE; i++) {
			for(int j = 0; j < ROW; j++) {
				int check = 65;
				while(((check < 58) && (check > 47))
				|| ((check < 123) && (check > 64))) {
					check = r.nextInt(126 - 33) + 33;
				}
				grid[(i*j)+j] = (char) check;
			}
		}
		return grid;
	}

	/**
	Method to generate the memory addresses
	They appear between the two columns of data
	*/
	private static int[] getAddresses() {
		Random r = new Random();
		int start = r.nextInt(0x7B48) + 0x7B48;
		int[] addresses = new int[LINE*2];
		addresses[0] = start;
		for(int i = 1; i < addresses.length; i++) {
			addresses[i] = addresses[i-1] + 0x06;
		}
		return addresses;
	}

	/**
	Method to print the grid to the terminal window
	@param grid is the array grid to be printed
	@param addresses is the array of computer memory addresses
	*/
	private static void print(char[] grid, int[] addresses) {

		for(int i = 0; i < ROW; i++) {

			//printing address column
			System.out.printf("0x" + "%x" + "\t", addresses[i]);

			//printing data column
			for(int j = 0; j < LINE; j++) {
				System.out.print(grid[(i*j)+j]);
			}
			if(i%2 == 0)
				System.out.print("\t");
			else
				System.out.println();
		}
	}

	/**
	Method to print win screen
	*/
	private static void gameWin() {
		clear();
		System.out.println("You Won!");
	}

	/**
	Method to print lose screen
	*/
	private static void gameLose() {
		clear();
		System.out.println("You Lose!");
	}

	/**
	Method to clear the terminal window
	*/
	private static void clear() {
		for(int i = 0; i < 56; i++) {
			System.out.println();
		}
	}

	/**
	Method to get a Scanner from a specified filename
	@param filename is a string denoting the filename
	@return scan the finished scanner
	*/
	private static Scanner getScanner(String filename) {
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
