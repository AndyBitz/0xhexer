/* Convert a value (0-255) to an ASCII character
 * for the ASCII Row.
 * Characters that cannot be converted will be shown as a dot.
 */
function toAscii(val) {

	if (val > 126 || val < 32)
		return '.';

	switch (val) {
		case 32:
			return ' ';

		case 33:
			return '!';

		case 34:
			return '"';

		case 35:
			return '#';

		case 36:
			return '$';

		case 37:
			return '%';

		case 38:
			return '&';

		case 39:
			return '\'';

		case 40:
			return '(';

		case 41:
			return ')';

		case 42:
			return '*';

		case 43:
			return '+';

		case 44:
			return ',';

		case 45:
			return '-';

		case 46:
			return '.';

		case 47:
			return '/';

		case 48:
			return '0';

		case 49:
			return '1';

		case 50:
			return '2';

		case 51:
			return '3';

		case 52:
			return '4';

		case 53:
			return '5';

		case 54:
			return '6';

		case 55:
			return '7';

		case 56:
			return '8';

		case 57:
			return '9';

		case 58:
			return ':';

		case 59:
			return ';';

		case 60:
			return '<';

		case 61:
			return '=';

		case 62:
			return '>';

		case 63:
			return '?';

		case 64:
			return '@';

		case 65:
			return 'A';

		case 66:
			return 'B';

		case 67:
			return 'C';

		case 68:
			return 'D';

		case 69:
			return 'E';

		case 70:
			return 'F';

		case 71:
			return 'G';

		case 72:
			return 'H';

		case 73:
			return 'I';

		case 74:
			return 'J';

		case 75:
			return 'K';

		case 76:
			return 'L';

		case 77:
			return 'M';

		case 78:
			return 'N';

		case 79:
			return 'O';

		case 80:
			return 'P';

		case 81:
			return 'Q';

		case 82:
			return 'R';

		case 83:
			return 'S';

		case 84:
			return 'T';

		case 85:
			return 'U';

		case 86:
			return 'V';

		case 87:
			return 'W';

		case 88:
			return 'X';

		case 89:
			return 'Y';

		case 90:
			return 'Z';

		case 91:
			return '[';

		case 92:
			return '\\';

		case 93:
			return ']';

		case 94:
			return '^';

		case 95:
			return '_';

		case 96:
			return '`';

		case 97:
			return 'a';

		case 98:
			return 'b';

		case 99:
			return 'c';

		case 100:
			return 'd';

		case 101:
			return 'e';

		case 102:
			return 'f';

		case 103:
			return 'g';

		case 104:
			return 'h';

		case 105:
			return 'i';

		case 106:
			return 'j';

		case 107:
			return 'k';

		case 108:
			return 'l';

		case 109:
			return 'm';

		case 110:
			return 'n';

		case 111:
			return 'o';

		case 112:
			return 'p';

		case 113:
			return 'q';

		case 114:
			return 'r';

		case 115:
			return 's';

		case 116:
			return 't';

		case 117:
			return 'u';

		case 118:
			return 'v';

		case 119:
			return 'w';

		case 120:
			return 'x';

		case 121:
			return 'y';

		case 122:
			return 'z';

		case 123:
			return '{';

		case 124:
			return '|';

		case 125:
			return '}';

		case 126:
			return '~';

		default:
			return '.';

	}

}