## 10/7/24 Last week update

So I was not diligent about taking notes last week. Let's briefly summarize what I was up to. 

Main thing is the library prep test. Caitlin and I devised a test where we evaluated how different parameters of the kit affect yield and library size. Fragmentation time of 6 vs 8 min, 4 or 6 PCR 
cycles, deceleration module or not, and two DNA sample of differing quality. 

Turns out that all methods yield plenty of DNA (more with 6 cycles), and that the libraries all yield decent fragment size distributions. The deceleration module resulted in libraries about 30bp 
longer, which was significant but not that big a difference. I think what we are going to do is just go with the deceleration module, 4 pcr cycles, and a fragmentatino time one minute less than the 
recommended. One thing we didn't test was the ratio of the bead:sample during the clean-up post-ligation and post-PCR. I think we could probably lower the ratio a bit and move that distribution over 
a bit. The average for the deceleration module tests was like 515 or something, and because it's more or less normally distirbuted, there is still a good chunk that is below the ~430 bp threshold 
where you are getting read overlap. The deceleration module protocol says it can get up to 550 bp inserts using lower ratios of SPRI bead. SO we could lower the ratio of AMPure. Could also get SPRI 
beads instead. But anyway, should probably lower the ratio but maybe not as much as the DM manual says. I'm thinking 0.7 instead of 0.8 post ligation, and 0.6 instead of 0.65 post PCR. Would mean 
slightly reduced yields, but we have plenty of DNA. We'll see.

Other news is that the BRB-seq data is ready! Got 869M reads, so about 2.3 M/sample. Pretty good! Started running STARsolo on the data using Darwin, and it looks like the mapping rate is way higher 
than it was with the MiSeq data, just around 82%. Great! Don't have to worry about that. I started it on the 4th, and it's still running. It's just sorting the bam, which is huge so it's taking 
forever. Hopefully it will finish in the next couple of days and I can use FastReadCounter and then actually start playing with DEseq. Oh we are also getting the library re-run, so we'll have closer 
to 5 M/sample. So I guess it doesn't really matter right now whether STARsolo runs. I will probably try running this on StickleMac next time. Or better yet, Poseidon!

Speaking of Poseidon, I am processing all of this pacific NCBI data on Poseidon right now. I downloaded and aligned all 443 accessions to the mitogenome and now I am sorting the bams and 
deduplicating them. Then I'll call SNPs, probably using freebayes. Once I have that I'll collapse everything to a fasta, retaining just those that have over a certain coverage (which most of them 
do). Then I'll make an alignment of all the sequences, make a tree, and call mitotypes! Then I can finally make this map.

Because this is so fast on Poseidon (using a SLURM array), I also decided to map to the nuclear genome, since I'll want those data at some point. That's just wrapping up now. I'll pull everything 
down to StickleScratch at some point.
