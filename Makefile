SHELL := /bin/bash

CV_SOURCE ?= /Users/zac/Documents/Personal/Zac Tobias CV.pdf
CV_DEST := files/Zac_Tobias_CV.pdf
GIT ?= git

.PHONY: sync-cv stage-cv deploy

sync-cv:
	@if [ ! -f "$(CV_SOURCE)" ]; then \
		echo "CV source not found: $(CV_SOURCE)"; \
		echo "Override it with: make sync-cv CV_SOURCE=\"/full/path/to/your/CV.pdf\""; \
		exit 1; \
	fi
	cp "$(CV_SOURCE)" "$(CV_DEST)"
	@echo "Synced $(CV_SOURCE) -> $(CV_DEST)"

stage-cv: sync-cv
	@$(GIT) add "$(CV_DEST)"
	@echo "Staged $(CV_DEST) for commit."

deploy: sync-cv
	@$(GIT) add "$(CV_DEST)"
	@if $(GIT) diff --cached --quiet -- "$(CV_DEST)"; then \
		echo "No CV PDF changes to commit."; \
	else \
		$(GIT) commit -m "Update CV PDF"; \
	fi
	@$(GIT) push
