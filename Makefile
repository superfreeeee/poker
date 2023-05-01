reinstall: clean-deps
	pnpm i

############### cleans ###############
clean-deps:
# remove root node_modules
	rm -r node_modules || true
# remove apps node_modules
	find apps -iname 'node_modules' | xargs rm -r

clean-build:
	echo 'TODO clean-build'
