// ==========================================
// 📝 DATA STOREBANK: ALL 50 QUESTIONS
// ==========================================
const quizDataRaw = [
    {
        question: "A cache has a hit rate of 92%. What is the miss rate?",
        options: ["0.92%", "8%", "12%", "18%"],
        correctIndex: 1,
        hint: "The total percentage of hits and misses combined must equal 100%.",
        explanation: "$\\text{Miss Rate} = 100\\% - \\text{Hit Rate}$. Therefore, $100\\% - 92\\% = 8\\%$."
    },
    {
        question: "A cache hit takes 1 cycle and a miss penalty is 100 cycles. If the hit rate is 95%, the Average Memory Access Time (AMAT) is:",
        options: ["1 cycles", "5 cycles", "6 cycles", "101 cycles"],
        correctIndex: 2,
        hint: "Formula: $\\text{AMAT} = \\text{Hit Time} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$",
        explanation: "The miss rate is 5% ($0.05$). $\\text{AMAT} = 1 + (0.05 \\times 100) = 1 + 5 = 6$ cycles."
    },
    {
        question: "Which locality states that recently accessed data is likely to be accessed again?",
        options: ["Spatial locality", "Sequential locality", "Temporal locality", "Logical locality"],
        correctIndex: 2,
        hint: "Think about locality centered around time repetition.",
        explanation: "Temporal locality implies that an asset or memory location referenced at one point in time is highly likely to be referenced again in the near future."
    },
    {
        question: "Main memory size is 64 KB and block size is 8 bytes. The number of offset bits is:",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        hint: "Offset bits equal $\\log_2$ of the block size in bytes.",
        explanation: "The block size is 8 bytes. Since $2^3 = 8$, $\\log_2(8)$ gives 3 offset bits."
    },
    {
        question: "A direct mapped cache contains 256 cache entries. The number of index bits equals:",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        hint: "Index bits equal $\\log_2$ of the total number of cache entries.",
        explanation: "With 256 unique entries available, $\\log_2(256)$ yields 8 index bits to adequately address each entry location."
    },
    {
        question: "Which cache organization produces the largest number of conflict misses?",
        options: ["Fully Associative", "Set Associative", "Direct Mapped", "Victim Cache"],
        correctIndex: 2,
        hint: "Consider the most restrictive placement policy layout where memory maps to exactly one entry.",
        explanation: "Direct Mapped caches have strict one-to-one entry mapping constraints, resulting in high entry-thrashing frequencies and severe conflict miss profiles."
    },
    {
        question: "A memory address is 32 bits. Cache has 1024 entries and block size is 16 bytes. Number of tag bits is:",
        options: ["16", "18", "20", "22"],
        correctIndex: 1,
        hint: "$\\text{Tag Bits} = \\text{Total Address Bits} - \\text{Index Bits} - \\text{Offset Bits}$.",
        explanation: "$$\\text{Offset} = \\log_2(16) = 4\\text{ bits}$$ $$\\text{Index} = \\log_2(1024) = 10\\text{ bits}$$ $$\\text{Tag} = 32 - 10 - 4 = 18\\text{ bits}$$"
    },
    {
        question: "A cache has 128 entries and a block size of 32 bytes. The total cache capacity is:",
        options: ["2 KB", "4 KB", "8 KB", "16 KB"],
        correctIndex: 1,
        hint: "Multiply the total number of entries directly by the size of each block.",
        explanation: "$\\text{Capacity} = 128\\text{ entries} \\times 32\\text{ bytes} = 4096\\text{ bytes}$. Since $\\frac{4096}{1024} = 4\\text{ KB}$."
    },
    {
        question: "The smallest unit transferred between cache and main memory is called a:",
        options: ["Word", "Byte", "Block", "Register"],
        correctIndex: 2,
        hint: "This multi-byte chunk travels as an aggregate data block layout.",
        explanation: "A block represents the atomic chunk grouping brought into cache hierarchies during a miss lifecycle sequence."
    },
    {
        question: "If block size = 64 bytes, how many offset bits are required?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        hint: "Find the base-2 logarithm of the byte capacity value.",
        explanation: "Because $2^6 = 64$, a total of 6 bits are needed to uniquely identify every byte index placement inside the block layout."
    },
    {
        question: "A cache has hit rate = 80%. During 500 memory accesses, the expected cache misses are:",
        options: ["50", "80", "100", "120"],
        correctIndex: 2,
        hint: "First isolate the miss percentage, then multiply it by total accesses.",
        explanation: "$\\text{Miss Rate} = 100\\% - 80\\% = 20\\%$. Total expected misses = $500 \\times 0.20 = 100$ misses."
    },
    {
        question: "During a cache hit, the processor obtains data directly from:",
        options: ["Secondary storage", "Main memory", "Cache memory", "Register file only"],
        correctIndex: 2,
        hint: "The request successfully matches inside the quickest upper-level memory layer.",
        explanation: "A cache hit confirms the item's presence in high-speed cache memory, allowing immediate fulfillment without dropping down to main system memory levels."
    },
    {
        question: "Main memory = 1 MB. Block size = 16 bytes. Total number of blocks in main memory equals:",
        options: ["32768", "65536", "131072", "16384"],
        correctIndex: 1,
        hint: "Divide total main memory space by single block space size values.",
        explanation: "$1\\text{ MB} = 2^{20}\\text{ bytes}$. $\\text{Block size} = 16\\text{ bytes } (2^4)$. $\\text{Total Blocks} = \\frac{2^{20}}{2^4} = 2^{16} = 65,536$ blocks."
    },
    {
        question: "A cache miss penalty is 80 cycles. Hit rate = 90%. Cache hit time = 2 cycles. AMAT equals:",
        options: ["8", "9", "10", "12"],
        correctIndex: 2,
        hint: "$\\text{AMAT} = \\text{Hit Time} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$. Note $\\text{Miss Rate} = 10\\%$.",
        explanation: "$\\text{AMAT} = 2 + (0.10 \\times 80) = 2 + 8 = 10$ cycles."
    },
    {
        question: "Spatial locality means:",
        options: ["Recently used data is reused", "Nearby memory locations are likely to be accessed", "Instructions execute in parallel", "Cache size increases"],
        correctIndex: 1,
        hint: "Think about spatial closeness or physical clustering layout behaviors.",
        explanation: "Spatial locality asserts that referencing an address yields a strong clustering likelihood that physical contiguous neighbor addresses will follow soon."
    },
    {
        question: "Memory size = 128 KB. How many address bits are needed?",
        options: ["15", "16", "17", "18"],
        correctIndex: 2,
        hint: "Convert 128 KB into pure bytes and check the base-2 power value exponent.",
        explanation: "128 KB = $128 \\times 1024\\text{ bytes} = 131,072\\text{ bytes}$. Since $2^{17} = 131,072$, it requires 17 bit channels."
    },
    {
        question: "A direct mapped cache has 64 entries. If memory block number = 145, the cache index equals:",
        options: ["15", "17", "19", "21"],
        correctIndex: 1,
        hint: "Apply the modulo mapping operator rule: $(\\text{Block Number} \\pmod{\\text{Total Cache Entries}})$.",
        explanation: "$145 \\pmod{64}$ results in a remaining value of $17$. Thus, it maps cleanly to entry index 17."
    },
    {
        question: "Block number = 350. Cache entries = 32. Which cache entry stores this block?",
        options: ["28", "29", "30", "31"],
        correctIndex: 2,
        hint: "Use remainder calculation logic via the modulo strategy: $350 \\pmod{32}$.",
        explanation: "350 divided by 32 equals 10 with a remainder of 30. ($350 \\pmod{32} = 30$). The target block maps into entry slot 30."
    },
    {
        question: "An instruction cache miss causes a stall in which pipeline execution stage?",
        options: ["ID (Instruction Decode)", "EX (Execute)", "MEM (Memory Access)", "IF (Instruction Fetch)"],
        correctIndex: 3,
        hint: "In which baseline cycle phase does the CPU look up and retrieve code text strings?",
        explanation: "Before steps can execute, commands must be brought in. Missing the instruction target halts processing instantly inside the Instruction Fetch (IF) layer."
    },
    {
        question: "A processor executes 50,000 instructions. Ideal CPI = 1.2. Memory stall cycles per instruction = 0.4. Effective CPI equals:",
        options: ["1.2", "1.4", "1.6", "1.8"],
        correctIndex: 2,
        hint: "$\\text{Effective CPI} = \\text{Ideal CPI} + \\text{Penalty Delay Stalls Per Unit}$.",
        explanation: "$\\text{Effective CPI} = 1.2 + 0.4 = 1.6$."
    },
    {
        question: "Given $ET = IC \\times CPI \\times \\text{Clock Period}$. If IC = 4000, CPI = 2, and Clock period = 0.5 ns, execution time equals:",
        options: ["2000 ns", "4000 ns", "8000 ns", "16000 ns"],
        correctIndex: 1,
        hint: "Multiply all three product numbers step-by-step.",
        explanation: "$\\text{ET} = 4000 \\times 2 \\times 0.5\\text{ ns} = 8000 \\times 0.5\\text{ ns} = 4000\\text{ ns}$."
    },
    {
        question: "A write stall condition occurs explicitly when:",
        options: ["CPU fetches instructions", "CPU waits while writing data", "ALU performs addition", "Register is read"],
        correctIndex: 1,
        hint: "A pipeline pause is triggered due to lagging memory write channels.",
        explanation: "A write stall represents execution bubbles introduced when processing threads wait for storage components to complete down-stream memory updates."
    },
    {
        question: "Cache size = 8 KB. Block size = 32 bytes. The number of cache entries equals:",
        options: ["128", "256", "512", "1024"],
        correctIndex: 1,
        hint: "Convert 8 KB to bytes and divide by the 32-byte block metric.",
        explanation: "$8\\text{ KB} = 8 \\times 1024 = 8192\\text{ bytes}$. $\\frac{8192}{32} = 256\\text{ entries}$."
    },
    {
        question: "A cache has 512 entries, Block size = 64 bytes, and Address size = 32 bits. Number of tag bits equals:",
        options: ["17", "18", "19", "20"],
        correctIndex: 0,
        hint: "$\\text{Tag Bits} = 32 - \\log_2(512) - \\log_2(64)$.",
        explanation: "$$\\text{Offset} = \\log_2(64) = 6\\text{ bits}$$ $$\\text{Index} = \\log_2(512) = 9\\text{ bits}$$ $$\\text{Tag bits} = 32 - 9 - 6 = 17\\text{ bits}$$"
    },
    {
        question: "A direct mapped cache has 4 cache entries. Memory blocks accessed are: 0, 4, 8, 0, 4, 8. How many cache hits occur?",
        options: ["0", "1", "2", "3"],
        correctIndex: 0,
        hint: "Determine block allocation using modulo 4. Do they replace each other?",
        explanation: "Blocks 0, 4, and 8 all evaluate to index position 0 ($0 \\pmod{4}=0$, $4 \\pmod{4}=0$, $8 \\pmod{4}=0$). They continually evict each other inside entry 0, causing zero hits."
    },
    {
        question: "Block size = 8 bytes. Which bits of the address represent the block offset?",
        options: ["1 bit", "2 bits", "3 bits", "4 bits"],
        correctIndex: 2,
        hint: "Calculate the base-2 logarithm ($\\log_2$) of the numerical byte size specification value.",
        explanation: "Because $2^3 = 8$ bytes, exactly 3 bits are structurally allocated within standard layout schemas to handle block column byte offsets."
    },
    {
        question: "Main memory = 64 KB, block size = 32 bytes. Number of blocks in main memory is:",
        options: ["1024", "2048", "4096", "8192"],
        correctIndex: 1,
        hint: "Convert the memory size cleanly to raw bytes before dividing by individual block byte capacity parameters.",
        explanation: "$$\\text{Blocks} = \\frac{64 \\times 1024\\text{ bytes}}{32\\text{ bytes}} = 2048\\text{ blocks}$$"
    },
    {
        question: "Which cache organization allows a memory block to be placed in any cache entry?",
        options: ["Direct Mapped", "Fully Associative", "Set Associative", "Victim Cache"],
        correctIndex: 1,
        hint: "Think about the layout rule structure that imposes absolute layout positioning freedom anywhere.",
        explanation: "Fully Associative designs bypass set routing indices completely, allowing a storage block to exist anywhere inside the cache tracking entry pool."
    },
    {
        question: "Address size = 20 bits, block size = 8 bytes, direct mapped cache with 16 entries. Tag bits =",
        options: ["13", "14", "15", "16"],
        correctIndex: 0,
        hint: "Formula: $\\text{Tag} = \\text{Address Size} - \\log_2(\\text{Block Size}) - \\log_2(\\text{Entries})$",
        explanation: "$$\\text{Offset} = \\log_2(8) = 3\\text{ bits}$$ $$\\text{Index} = \\log_2(16) = 4\\text{ bits}$$ $$\\text{Tag} = 20 - 3 - 4 = 13\\text{ bits}$$"
    },
    {
        question: "A cache has 16 entries and block size 8 bytes. Total cache capacity =",
        options: ["32 bytes", "64 bytes", "128 bytes", "256 bytes"],
        correctIndex: 2,
        hint: "Multiply total index structural entries directly against block byte sizes.",
        explanation: "$\\text{Capacity} = 16\\text{ entries} \\times 8\\text{ bytes} = 128\\text{ bytes}$."
    },
    {
        question: "What is the main cause of the 0% hit rate in the direct mapped example on page 92?",
        options: ["Conflict misses", "Capacity misses", "Compulsory misses", "Write misses"],
        correctIndex: 0,
        hint: "Think about competitive cache access overrides involving matching mapping indexes.",
        explanation: "Conflict misses happen when multiple addresses battle for identical entry fields, creating constant evictions even if available slots go unused."
    },
    {
        question: "Block number = 1036 in a direct mapped cache with 4 entries. Cache index =",
        options: ["0", "1", "2", "3"],
        correctIndex: 0,
        hint: "Apply mod logic: $\\text{Block Number} \\pmod{\\text{Cache Entries}}$.",
        explanation: "$1036 \\pmod{4} = 0$, meaning the execution path assigns this block to entry index 0."
    },
    {
        question: "Hit rate = 97%, miss penalty = 50 cycles, hit time = 1 cycle. AMAT =",
        options: ["1.5", "2.5", "3.0", "4.0"],
        correctIndex: 1,
        hint: "$\\text{AMAT} = \\text{Hit Time} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$. Here, $\\text{Miss Rate} = 3\\%$.",
        explanation: "$\\text{AMAT} = 1 + (0.03 \\times 50) = 1 + 1.5 = 2.5$ cycles."
    },
    {
        question: "A data cache miss occurs in which pipeline stage?",
        options: ["IF", "ID", "MEM", "WB"],
        correctIndex: 2,
        hint: "Which cycle phase targets operational reads/writes to active variables?",
        explanation: "Data access updates execute exclusively during the Memory access (MEM) stage pipeline checkpoint."
    },
    {
        question: "A direct mapped cache has 128 cache entries. The number of index bits is:",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        hint: "Index bits equal $\\log_2$ of the total number of cache entries.",
        explanation: "$\\text{Index bits} = \\log_2(128) = 7$."
    },
    {
        question: "A direct mapped cache has: Address size = 32 bits, Block size = 16 bytes, Number of cache entries = 256. The number of tag bits is:",
        options: ["18", "20", "22", "24"],
        correctIndex: 1,
        hint: "$\\text{Tag} = \\text{Address Size} - \\log_2(\\text{Cache Entries}) - \\log_2(\\text{Block Size})$.",
        explanation: "$$\\text{Offset} = \\log_2(16) = 4\\text{ bits}$$ $$\\text{Index} = \\log_2(256) = 8\\text{ bits}$$ $$\\text{Tag} = 32 - 8 - 4 = 20\\text{ bits}$$"
    },
    {
        question: "In a direct mapped cache, the cache entry is determined by:",
        options: ["Block Offset", "Tag", "Block Number mod Number of Cache Entries", "Address Size"],
        correctIndex: 2,
        hint: "Think about mapping structures via remainders.",
        explanation: "The tracking entry destination index is computed by taking $\\text{Block Number} \\pmod{\\text{Number of Cache Entries}}$."
    },
    {
        question: "$\\text{CPI}_{\\text{AVG}} = 1.8$ and average memory stalls per instruction = 0.108. Effective CPI =",
        options: ["1.800", "1.880", "1.908", "2.108"],
        correctIndex: 2,
        hint: "Add the core ideal benchmark metric and the structural pause stalls together.",
        explanation: "$\\text{Effective CPI} = 1.8 + 0.108 = 1.908$."
    },
    {
        question: "Instruction cache hit rate = 95%, read miss penalty = 20 cycles. Average instruction miss penalty per instruction is:",
        options: ["0.5", "1.0", "2.0", "5.0"],
        correctIndex: 1,
        hint: "Multiply the structural miss rate ($100\\% - 95\\%$) directly against the penalty cycle count.",
        explanation: "$\\text{Penalty Per Instruction} = (1 - 0.95) \\times 20 = 0.05 \\times 20 = 1.0$ cycle."
    },
    {
        question: "Which of the following is not a type of memory stall?",
        options: ["Read stall", "Write stall", "Instruction stall", "Arithmetic stall"],
        correctIndex: 3,
        hint: "Identify the element handled internally inside internal ALU paths rather than memory loops.",
        explanation: "Arithmetic delays originate within ALU pipeline logic structures, not data or instruction cache transmission pathways."
    },
    {
        question: "A cache with 4 blocks stores blocks 1024, 1028, 1032, 1036 sequentially. How many cache hits occur during these four accesses?",
        options: ["0", "1", "2", "3"],
        correctIndex: 0,
        hint: "Are any of these unique block tags loaded beforehand?",
        explanation: "Because all four addresses reference cold, non-loaded parameters sequentially into layout caches, all four generate standard compulsory cold misses ($0$ hits)."
    },
    {
        question: "Main memory = 256 bytes, block size = 8 bytes. Number of blocks in main memory =",
        options: ["8", "16", "24", "32"],
        correctIndex: 3,
        hint: "Divide total raw byte capacity limits by the individual block byte size.",
        explanation: "$\\text{Blocks} = \\frac{256}{8} = 32\\text{ memory blocks}$."
    },
    {
        question: "A cache block contains 64 data bits and 15 metadata bits. Total bits in the block =",
        options: ["64", "79", "80", "96"],
        correctIndex: 1,
        hint: "Sum together your payload data bits and tracking metadata channels.",
        explanation: "$\\text{Total Size} = 64\\text{ data bits} + 15\\text{ metadata bits} = 79\\text{ bits}$."
    },
    {
        question: "What does the valid bit indicate?",
        options: ["Cache index", "Block offset", "Whether the cache block contains valid data", "The replacement policy"],
        correctIndex: 2,
        hint: "Think about checking if a slot's cached block data is authentic and initialized.",
        explanation: "The valid bit works as a binary status flag tracking whether a slot stores contextually active target memory or uninitialized junk data."
    },
    {
        question: "A direct mapped cache has 32 cache entries. A memory block number is 95. The memory block will be placed in cache entry:",
        options: ["29", "30", "28", "31"],
        correctIndex: 3,
        hint: "Evaluate standard modulo coordinates: $\\text{Block Number} \\pmod{\\text{Cache Entries}}$.",
        explanation: "$\\text{Cache Entry} = 95 \\pmod{32} = 31$."
    },
    {
        question: "Address = 0x3A17, block size = 8 bytes. Byte offset =",
        options: ["3", "7", "17", "23"],
        correctIndex: 1,
        hint: "Check the remainder values generated using a modulo base-8 approach on hex trailing bits.",
        explanation: "Hex $0\\text{x}3\\text{A}17$ translates to $14871$ in decimal. $14871 \\pmod{8} = 7$. Alternatively, lower 3 binary bits equal $111_2 = 7$."
    },
    {
        question: "Using address 0x3A17 with block size = 8 bytes, the block number is:",
        options: ["1858", "2048", "1024", "8192"],
        correctIndex: 0,
        hint: "Perform an integer division step mapping: $\\lfloor\\text{Decimal Address} / \\text{Block Size}\\rfloor$.",
        explanation: "Decimal address $14871$ divided by $8$ equals $1858.875$. Dropping the fraction yields block number $1858$."
    },
    {
        question: "Which field of a direct mapped address selects the cache entry?",
        options: ["Tag", "Offset", "Valid", "Index"],
        correctIndex: 3,
        hint: "Identify the unique bits that specify entry index fields.",
        explanation: "The address index segment targets explicit row entry index fields mapped inside structured direct cache lookup systems."
    },
    {
        question: "For a fully associative cache: Address size = 20 bits, Block size = 8 bytes. Tag bits =",
        options: ["14", "16", "17", "18"],
        correctIndex: 2,
        hint: "Fully associative setups don't use index fields. $\\text{Tag} = \\text{Address Size} - \\text{Offset Bits}$.",
        explanation: "$$\\text{Offset} = \\log_2(8) = 3\\text{ bits}$$ $$\\text{Tag} = 20 - 3 = 17\\text{ bits}$$"
    },
    {
        question: "A processor executes 100,000 instructions. Effective CPI = 2.5, Clock period = 1 ns. Execution time =",
        options: ["100 μs", "250 μs", "500 μs", "2.5 ms"],
        correctIndex: 1,
        hint: "Formula: $\\text{ET} = \\text{Instructions} \\times \\text{Effective CPI} \\times \\text{Clock Period}$.",
        explanation: "$$\\text{ET} = 100,000 \\times 2.5 \\times 1\\text{ ns} = 250,000\\text{ ns} = 250\\ \\mu\\text{s}$$"
    }
];

export default quizDataRaw;
