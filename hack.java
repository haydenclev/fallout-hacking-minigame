/**
This class executes HACKING a java/terminal window replication of the 
popular Fallout 4 terminal hacking system.

Hayden Clevenger
hayden.clev@gmail.com
December 12, 2015
*/

import java.io.File;
import java.util.Random;
import java.util.Scanner;
import java.util.NoSuchElementException;

public class hack {

	//fields
	private static final int LINE = 20;	//num chars in one column
	private static final int ROW = 40;	//num of rows total (or num rows in one column * 2)
	private static final int NUM_WORDS = 10;
	private static final int TRIES = 4;
	private static int WORD_LEN = 4;

	 public static void main(String[] args) {

		//checking command line args
		if(	args.length != 1
			|| ( !args[0].equals("easy")
			&& !args[0].equals("medium")
			&& !args[0].equals("hard"))) {

			System.out.println("Usage: java hack <difficulty:{easy,medium,hard}>");
			System.exit(1);
		}
		else if(args[0].equals("hard"))
			WORD_LEN = 7;
		else if(args[0].equals("medium"))
			WORD_LEN = 5;
		else
			WORD_LEN = 4;

		Scanner scan = new Scanner(System.in);
		String choice = "y";

		//allowing user to continue
		while(choice.equals("y")) {

			//running actual game
			int win = runGame();

			//checking for win or loss
			if(win == 1)
				gameWin();

			else
				gameLose();

			//continue?
			System.out.println("continue? (y/n)");
			choice = scan.next();
		}
	}

	/////////////////////
	//ACCESSORY METHODS//
	/////////////////////

	/**
	Method to run the actual game
	*/
	private static int runGame() {
		//variables to handle game board and state
		char[] grid = makeGrid();
		String[] words = makeWords();
		grid = inputWords(grid, words);
		int[] addresses = getAddresses();
		Scanner scan = new Scanner(System.in);
		int chances = 0;
		Random r = new Random();
		int key = r.nextInt(words.length);
		String[] guesses = new String[TRIES];

		while(chances < TRIES) {
			print(grid, addresses, guesses, chances);

			//reading in user input
			String choice = scan.next();

			//checking for user match
			int likeness = likeness(choice, words, key);

			//checking if game is over
			if(likeness == WORD_LEN) { return 1; }	//win

			//handle braces
			//handle likeness

			//add user input to guesses
			guesses[chances] = "INPUT: " + choice + " LIKENESS: " + likeness;

			chances++;
		}

		return -1;	//lose
	}

	/**
	Method to check likeness of user input
	@param choice is the user input
	@param words is the String[] of words
	@param key is the entry in String[] that is the password
	@return the likeness of the input and password
	*/
	private static int likeness(String choice, String[] words, int key) {
		int likeness = 0;
		int length = choice.length() < WORD_LEN ? choice.length() : WORD_LEN;
		for(int i = 0; i < length; i++) {
			if(choice.charAt(i) == words[key].charAt(i)) {
				likeness++;
			}
		}
		return likeness;
	}

	/**
	Method to check whether the game is over or not
	@param chances is how many chances the user has remaining
	@param likeness is the likeness of user input and password
	@return 1 on win, 0 on lose, and likeness of input
	*/
	private static int gameOver(int chances, int likeness) {
		if(likeness == WORD_LEN) {
			return 1;	//win
		}
		else if(chances <= 0) {
			return -1;	//lose
		}
		return 0;	//still going
	}

	/**
	Method to put the words in the grid
	@param grid is the game grid of ascii chars
	@param words is the String[] of words
	*/
	private static char[] inputWords(char[] grid, String[] words) {

		Random r = new Random();
		int spacing = (LINE * ROW) / NUM_WORDS;	//frequency of words
		//check for frequency vs word length conflict
		if(spacing < WORD_LEN) {
			System.out.println("Spacing and Word Length conflict");
			System.exit(-1);
		}

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
		int dictSize = getDictSize();

		for(int i = 0; i < NUM_WORDS; i++) {
			Scanner scan = getScanner("dictionary/dict" + WORD_LEN + ".txt");
			int rand = r.nextInt(dictSize);
			for(int j = 0; j < rand; j++) {
				scan.nextLine();
			}
			words[i] = scan.next();
		}
		return words;
	}

	/**
	Method to count the number of lines contained in a dictionary file
	@return size which is the number of words in the dictionary file
	*/
	private static int getDictSize() {
		int count = 0;
		Scanner scan = getScanner("dictionary/dict" + WORD_LEN + ".txt");
		try {
			while(scan.nextLine() != null) { count++; }
		}
		catch (NoSuchElementException e) {
			scan.close();
		}
		return count;
	}

	/**
	Method to greate the grid of random ascii values
	@return grid the game array of chars
	*/
	private static char[] makeGrid() {

		char[] grid = new char[ROW * LINE];

		Random r = new Random();

		//populating array
		for(int i = 0; i < LINE*ROW; i++) {
			int check = 65;
			while(((check < 58) && (check > 47))	//removing ascii codes 48-57
			|| ((check < 91) && (check > 63)) 		//removing ascii codes 64-90
			|| ((check < 123) && (check > 96))) {	//removing ascii codes 97-122
				check = r.nextInt(126 - 33) + 33;
			}
			grid[i] = ((char)check);
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
		int[] addresses = new int[ROW];
		addresses[0] = start;
		for(int i = 1; i < addresses.length; i++) {
			addresses[i] = addresses[i-1] + 0x06;
		}
		return addresses;
	}

	/**
	Method to print the grid to the terminal window
	@param grid is the char array to be printed
	@param addresses is the array of computer memory addresses
	@param guesses is the String[] of user guesses
	@param chances is the number of tries so far by the user
	*/
	private static void print(char[] grid, int[] addresses, String[] guesses, int chances) {

		clear();

		for(int i = 0; i < ROW/2; i++) {

			//printing address column
			System.out.printf("0x" + "%x" + "\t", addresses[i]);

			//printing first data column
			for(int j = 0; j < LINE; j++) {
				System.out.print(grid[(i * LINE) + j]);
			}

			System.out.print("\t");

			//printing second address column
			System.out.printf("0x" + "%x" + "\t", addresses[ROW/2+i]);

			//printing second data column
			for(int j = 0; j < LINE; j++) {
				System.out.print(grid[(i * LINE) + j + grid.length/2]);
			}

			System.out.println();
		}

		//printing user guesses
		for(int i = 0; i < guesses.length; i++) {
			if(guesses[i] != null)
				System.out.println(guesses[i]);
		}

		System.out.println("TRIES REMAINING: " + (TRIES-chances));
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
