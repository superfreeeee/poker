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

upload-pc:
	scp -r apps/pc/dist/ root@remote:/root/poker-dist/
	scp -r apps/pc/deploy/* root@remote:/root/poker-dist/

remote-restart:
	ssh root@remote "cd /root/poker-dist/; ./restart.sh"
