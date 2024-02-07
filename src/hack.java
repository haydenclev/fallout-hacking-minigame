package src; /**
This class executes HACKING a java/terminal window replication of the 
popular Fallout 4 terminal hacking system.

Hayden Clevenger
hayden.clev@gmail.com
December 12, 2015
*/

import java.util.*;

import static src.utils.*;

public class hack {

	//fields
	private static int LINE = 20;	//num chars in one column
	private static int ROW = 40;	//num of rows total (or num rows in one column * 2)
	private static int NUM_WORDS = 10;
	private static int GUESS_LIMIT = 4;
	private static int WORD_LEN = 4;

	 public static void main(String[] args) {

		//checking command line args
		if(	args.length != 1
			|| ( !args[0].equals("easy")
			&& !args[0].equals("medium")
			&& !args[0].equals("hard"))
			&& !args[0].equals("extreme")) {

			System.out.println("Usage: java src.hack <difficulty:{easy,medium,hard}>");
			System.exit(1);
		}
		else if(args[0].equals("extreme")) {
			WORD_LEN = 7;
			LINE = 60;
			ROW = 80;
			NUM_WORDS = 50;
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



	/**
	Method to run the actual game
	*/
	private static int runGame() {
		//variables to handle game board and state
		char[] grid = makeGrid();
		Set<String> words = makeWords();
		grid = inputWords(grid, words);
		int[] addresses = getAddresses();
		Scanner scan = new Scanner(System.in);
		int guessCount = 0;
		String password = choosePassword(words);
		List<String> guesses = new ArrayList<>(GUESS_LIMIT);

		while(guessCount < GUESS_LIMIT) {
			print(grid, addresses, guesses, guessCount);

			//reading in user input
			String guess = scan.next();

			if(words.contains(guess)) {
				//checking for user match
				int likeness = likeness(guess, password);

				//checking if game is over
				if (likeness == WORD_LEN) {
					return 1;
				}    //win

				//handle braces
				//handle likeness

				//add user input to guesses
				guesses.add("INPUT: " + guess + " LIKENESS: " + likeness);

				guessCount++;
			}
			else {
				guesses.add("INVALID GUESS: " + guess);
			}


		}
		System.out.println("password: " + password);
		return -1;	//lose
	}

	/**
	 * Method to choose password from set of possible options
	 * @param words is the Set<String> of options
	 */
	private static String choosePassword(Set<String> words) {
		Random r = new Random();
		int key = r.nextInt(NUM_WORDS);

		int i = 0;
		String password = null;
		for(String word : words) {
			if(i == key) {
				password = word;
				break;
			}
			i++;
		}
		return password;
	}

	/**
	Method to check likeness of user input
	@param choice is the user input
	@param password is the password
	@return the likeness of the input and password
	*/
	private static int likeness(String choice, String password) {
		int likeness = 0;
		int length = choice.length() < WORD_LEN ? choice.length() : WORD_LEN;
		for(int i = 0; i < length; i++) {
			if(choice.charAt(i) == password.charAt(i)) {
				likeness++;
			}
		}
		return likeness;
	}

	/**
	Method to put the words in the grid
	@param grid is the game grid of ascii chars
	@param words is the Set<String> of words
	*/
	private static char[] inputWords(char[] grid, Set<String> words) {

		Random r = new Random();
		int spacing = (LINE * ROW) / NUM_WORDS;	//frequency of words
		//check for frequency vs word length conflict
		if(spacing < WORD_LEN) {
			System.out.println("Spacing and Word Length conflict");
			System.exit(-1);
		}

		Iterator<String> iterator = words.iterator();

		for(int i = 0; i < NUM_WORDS; i++) {
			int region = r.nextInt(spacing - WORD_LEN);
			int place = (i * spacing) + region;

			String word = iterator.next();
			for(int j = 0; j < WORD_LEN; j++) {
				grid[j+place] = word.charAt(j);
			}
		}
		return grid;
	}

	/**
	Method to create the array of words that appear in the grid
	@return words a Set<String> of words
	*/
	private static Set<String> makeWords() {
		Random r = new Random();
		HashSet<String> words = new HashSet<>();
		ArrayList<Integer> numbers = new ArrayList<Integer>();
		int dictSize = getDictSize();

		for(int i = 0; i < NUM_WORDS; i++) {
			Scanner scan = getScanner("dictionary/dict" + WORD_LEN + ".txt");
			int rand = r.nextInt(dictSize);
			//making sure word not already included
			while(numbers.contains(rand)) {
				rand = r.nextInt(dictSize);
			}
			numbers.add(rand);
			for(int j = 0; j < rand; j++) {
				scan.nextLine();
			}
			words.add(scan.next());
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
	@param guesses is the List<String> of user guesses
	@param chances is the number of tries so far by the user
	*/
	private static void print(char[] grid, int[] addresses, List<String> guesses, int chances) {

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
		for(int i = 0; i < guesses.size(); i++) {
			if(guesses.get(i) != null)
				System.out.println(guesses.get(i));
		}

		System.out.println("GUESS_LIMIT REMAINING: " + (GUESS_LIMIT -chances));
	}
}
