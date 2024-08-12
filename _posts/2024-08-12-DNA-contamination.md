## 8/12/24 DNA contamination?

Well it's been some time since I've last posted. Updates.

Went to Evolution 2024 in Montreal
Got COVID
Worked from home while infected for 10 days. 
Mostly worked on mitonuclear proposal in meantime 

Now finally back in the lab!

Before I went to Evolution I was wrapping up the last of my RNA extractions when I noticed that I had been skipping a step in the extractions. Before the DNAse treatment, there is a wash step that I 
skipped for all of my samples, as far as I know. Doesn't seem like the end of the world, but if there are some inhibitors present in the lysate, that could interfere with the DNAse and mean there 
would be DNA contamination in my RNA samples.... I talked to the folks at Alithea Genomics and they said that their kit is pretty insensitive to DNA contamination, so that's reassuring. But I also 
figured it would be worth testing for DNA contamination in my samples.

So today I ran a PCR using Caitlin's inversion primers. I used a gDNA sample from Oregon as a positive control, and ran 7 RNA samples from later in the process (from at least two different days' 
extractions). 

Here's the pic of the gel.

![gel](/docs/assets/img/IMG_9913.jpeg)

We don't have a gel dock, so we take pictures with our phones using a carboard box and a transilluminator. So, crummy pictures but you get the idea.

First column is the positive control. Looks like all but one of the RNA samples are DNA free. The offending sample is 2024_DJR_407, which is a fish gill from Black Creek. This one had crazy high RNA 
yield (682 ng/ul), so maybe makes sense that that one would have the highest amount of DNA contamination (denser lysate, more inhibitors, more DNA?).

In either case, because it only seems to probably be only a handful of samples (hopefully), I think we can just proceed. The poly-A enrichment should be another step to filter out any DNA. I 
suppose we can try to use bioinformatic methods to see if this is a persistent issue (mapping to introns, for example). I really hope this works!

So I spoke with Diana about this, and what we are going to do is a couple things. First, I will take some adult fish from the fish room and extract gills again. For one I will use DNAse (with the 
wash) and the other I will do just the wash. Meanwhile, I'll also split one of the high-yield RNA samples (e.g. 407), and treat half of it with DNAse and repurify. Do a PCR with all of these and see 
what it looks like. If the newly extracted sample treated with DNAse still has trace DNA, then this is probably a common issue and we can't do much about the DNA contam. If the second DNAse 
treatment gets rid of the band for 407, then that would suggest that, if we wanted to, we could do another DNAse treatment. If it doesn't, then there's no point and we should just go for it.

I think the conclusion is that we should just go for it, but I'll hold off until we have this extra information.

I was supposed to go use the robot at JCVI this Thursday, but looks like we'll probably have to push until next week. I'll let Ariel know.
