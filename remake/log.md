@@@Road Map
	1. 	Change http to https
	6. 	Make a basic Annouce page template
		-- finished
	7. 	Make a announce publish function	
		-- finished
	8. 	Add edit announcement content function
		-- this branch
	9. 	Revert all highlighted and selected cells when cancel in Member page
		-- finished
	6. 	Upload attchment in announcement
		-- this branch
	7. 	Automatically generate fill up date data
		-- this branch
	8. 	Selecting style in Announce page
		-- this branch
	9.	Make a save change button		
		-- finished
	10. Update the announcement given by colleagues.
		-- this branch
	11. Dynamically set style between each page maybe can use some animation


---
	## 2023.08.09		version 0.1.3 --Announce-build
	-- Function implementation
	-- Rewrite function
	-- Bug fix
	-- Style change
	-- Clear wasted codes
	# Added
	1. Add a basic Announce page 
		-- finished
	2. Add publish new announcement function
		-- finished
	3. Add save function to Announce page
		-- finished
	4. Add uxSave to handle all save function
		-- finished
	5. Integrate all selection mode into one
		-- finished
	# Changed
	1. Rewrite memBuild function by new Render function
		-- finished
	2. Cntralize the un-select process to unedit buttons
		-- finished
	3. Separately set different pages style
		-- finished
	# Fixed
	1. Fix the bug that uxSave cannot trigger unedit event
		-- finished
	2. Fix the bug that logout not trigger edit mode deactivation
		-- finished
	3. Fix selected status is not dismissed after logout and save
		-- finished
---
	## 2023.08.09		version 0.1.2 --Member-build
	-- Clear codes
	-- Function implementation
	-- Function enhancement
	# Added
	1. Add cancel button to leave edit mode
		-- finished
	2. Add uxSelect to return Login and Editing status
		-- finished
	# Change
	1. Rewrite Unselect status handler
		-- finished
	2. Rewrite content edit function to a easier to execute way
		-- finished
	3. Add remove content editable status before saving
		-- finished
	4. Append row function is contenteditable support
		-- finished
	5. Port selection color style to memStyle
		-- finished
---
	## 2023.08.08		version 0.1.1 --Member-build
	-- Function implementation
	# Added
	1. Add a basic login interactive function to ensure edit function is protected before login and functions are protected before edit mode
		-- finished
	2. Add a login check function to check login status and remain it
		-- finished
	3. Add hide and unhide function to control elements display status
		-- finished
	4. Add Logout function and work with Login function
		-- finished
	5. Add uxSelect function to handle all selection related operation
		-- finished
---
	## 2023.08.07		version 0.1.0 --Member-build
	-- Function implementation
	-- Rebuild function
	# Added
	1. Add memTitleCreate function
		-- finished
	2. Rebuild function from json parsing to deliver-and-receive
		-- finished
	3. Building selection function in member page
		-- finished
---
	## 2023.08.02		version 0.0.9 --Member-build
	-- Add member JSON
	-- Add member row creating function
	# Added
	1. Add json file to store all member-related information
		-- finished
	2. Add memHeaderCreate function to read and produce viable member header
		-- finished
---
	## 2023.07.31		version 0.0.8 --Member-build
	-- Member section infrastructure
	# Added
	1. Add basic page loader and member infrasturcture
		-- finished		
---
	## 2023.05.05		version 0.0.7
	-- Totally remake for new server and Chrome-only
---
	## 2023.05.04		version 0.0.6
	-- Readjust the design of download.html
	-- Implement new management at naming
	-- Download file structure rebuild
---
	## 2023.04.24		version 0.0.5
	-- Fix the misplaced problem due to IE compatiability
	-- Style change
	-- Merge download page
---
	## 2023.03.28		version 0.0.4
	-- Rewrite all structure to pure html
	-- Build tb-download
	-- Build tb-affairs basic download function
---
	## 2023.03.27		version 0.0.3
	-- Complete the basic information of member
	-- Adding font-size 
---
	## 2023.03.25		version 0.0.2
	-- Add some information for member
---
	## 2023.03.16		version 0.0.1
	-- Homepage structure building
	-- Basic member page structure
---