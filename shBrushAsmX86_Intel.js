/**
 * This file is an custom assembly brush for Intel style x86 assembly,
 * and it must be used with SyntaxHighlighter.
 *
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
    	var registers = "rax eax ax ah al" +
    	                " rbx ebx bx bh bl" +
    	                " rcx ecx cx ch cl" +
    	                " rdx edx dx dh dl" +
    	                " rbp ebp bp bpl" +
    	                " rsp esp sp spl" +
    	                " rdi edi di dil" +
    	                " rsi esi si sil" +
    	                " rip eip ip" +
    	                " cs ss ds es fs gs" +
    	                " cr0 cr1 cr2 cr3 cr4";
    	var keywords = "qword dword word sword byte org" +
    	               " far near ptr" +
    	               " proc endp invoke proto end";
    	var dot_directives = "\\.model" +
    	                     " \\.386 \\.386p \\.387 \\.486 \\.486p \\.586 \\.586p \\.686 \\.686p \\.mmx \\.xmm" +
    	                     " \\.code \\.data \\.stack";
    	var dot_directives_regexp = "(?:\\W)(" + dot_directives.trim().replace(/\s+/g, "|") + ")(?=\\W|$)";

    	var instructions = "add sub mul div inc dec shl shr rcl rcr xor and or not test cmp" +
    	                   " mov lea push pop" +
    	                   " jmp jz jnz jle" +
                           " rep stos stosb stosw stosd stosq" +
    	                   " call ret int iret enter leave sysenter sysexit syscall sysret hlt" +
    	                   " sgdt lgdt sldt lldt";
        var instructions_regexp = "(?:^\\s*)(" + instructions.trim().replace(/\s+/g, "|") + ")(?=\\s|;|$)";
        var rep_instructions_regexp = "(?:^\\s*rep\\s*)(" + instructions.trim().replace(/\s+/g, "|") + ")(?=\\s|;|$)";

		this.regexList = [
			{ regex: /;.*$/gm,                                          css: 'comments' },
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,     css: 'string'   },
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,     css: 'string'   },
			{ regex: new RegExp(this.getKeywords(keywords), 'gmi'),     css: 'keyword'  },
			{ regex: new RegExp(dot_directives_regexp, 'gmi'),          css: 'keyword'  },
			{ regex: new RegExp(instructions_regexp, 'gmi'),            css: 'functions'},  // for instructions,
            { regex: new RegExp(rep_instructions_regexp, 'gmi'),        css: 'functions'},  // for rep instructions
            { regex: /^\s*\w*:/gm,                                      css: 'color1'   },  // for labels
			{ regex: new RegExp(this.getKeywords(registers), 'gmi'),    css: 'variable' },  // for registers
			{ regex: /(?:\W)(\d+|0x[0-9a-f]+|\d[0-9a-f]*h)(?=\W|$)/gmi, css: 'value'    }
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['asm-x86-intel', 'asm-masm'];

	SyntaxHighlighter.brushes.AsmX86_Intel = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
