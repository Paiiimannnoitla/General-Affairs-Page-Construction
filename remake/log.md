@@@Road Map
	1. 	Change http to https
	8. 	Selecting style in Announce page
		-- this branch
	10. Update the announcement given by colleagues.
		-- this branch
	11. Dynamically set style between each page maybe can use some animation
	25. Bug:Add delete row button to member page
		-- this branch
	26. When save should move all related files and template to recycle bin instead of overriding
	30. Remove the warning when download file without https
		-- processing
	32. Make a move to the bottom button
		-- finished
	35. Bug:to the top button not work in new style
		-- finished
	36. Make a smooth scroll animation for jump or move operation
		-- announce page
	37. Bug: Style is changed in Member page
		-- fixed
	38. Make table head fixed
		-- prcessing
	


---
	## 2023.08.31		version 0.2.4 -- Announce-build
	-- Code arrangement
	-- Function implementation
	-- Style change
	-- Bug fix
	# Added
	1. Add Move to the bottom button for quickly scroll to the bottom
		-- finished
	# Changed
	1. Change the overall style to a more stable way
		-- finished
	# Fixed
	1. Fix the bug that uxMove function is not work at inner table by change the target
		-- finished
	2. Fix the bug that uxMove should work at every page not specific page
		-- finished
	3. Fix the Member page instable style 
		-- finished
---
	## 2023.08.30		version 0.2.3 -- Announce-build
	-- Function enhancement
	-- Style change
	# Added
	1. Add anc-content class to anouncement content for further attribute application including overflow-wrap
		-- finished
	# Changed
	1. Separate the function-menu and table and make sure this work without interruption
		-- finished
	2. When the line is too long,break the lines
		-- finished
---
	## 2023.08.29		version 0.2.2 -- Announce-build
	-- Function implementatation
	-- Rewrite function
	# Added
	1. Add delete button to handle table row deletion
		-- finished
	2. Add a move to the top button for quickly browsing to the latest
		-- finished
	3. After publish a new announce auto move to the top
		-- finished
	# Changed
	1. Rewrite index generating rule in publish function to ensure no id duplicate
		-- finished
	2. Rewrite the arrangement method by reverse order for more intuitive way
		-- finished
---
	## 2023.08.28		version 0.2.1 -- Announce-build
	-- Function implementation
	-- Function enhancement
	# Added
	1. Add download function to handle all download request
		-- finished
	2. Rewrite download process by fetch and buffer for no flickering
		-- finished
	3. Add file order in pack function and use it to be the signal of clearing directory
		-- finished
---
	## 2023.08.25		version 0.2.0 -- Announce-build
	-- Function implementation
	-- Function enhancement
	-- Style change
	# Added
	1. Add extDate function to return current year-month-day information
		-- finished
	2. Auto fill up date information when generating announcement
		-- finished
	3. Add index auto generated function by counting the number of announcement
		-- finished
	4. Create individual folder by announcement id for each announcement
		-- finished
	5. Add download function when link is trigger
		-- finished
	# Change
	1. No longer use bright function on item selection, use border instead
		-- finished
	2. Add index at announce page
		-- finished
	3. Add edit-mode tag to upload button 
		-- finished
	4. Hover also trigger link checked
		-- finished
	5. Add cursor-pointer to link
		-- finished
	
---
	## 2023.08.24		version 0.1.9 --Announce-build
	-- Function enhancement
	-- Rewrite function
	-- Bug fix
	# Added
	1. Add attatchment after uploading
		-- processing
	2. Add individual item selection function
		-- procesing
	# Changed
	1. Rewrite several function from explicit hostname declaim to central one for public test
		-- finished
	# Fixed
	1. Fix the bug that sometimes when unedit may lead to selected-related error
		-- finished
	2. Fix the attatchment of announce page can be edit issue
		-- finished
	3. Fix the attatchment display duplicate problem
		-- finished
	4. Fix the line-break holds space even not in edit mode
		-- finished
---
	## 2023.08.23		version 0.1.8 --Announce-build
	-- Bug fix
	# Added
	1. Add a upload button in each attachment area for uploading control
		-- finished
	2. Return downloadable url
		-- finished
	# Fixed
	1. Remove editable content in announce page
		-- finished
	
---
	## 2023.08.21		version 0.1.7 --Announce-build
	-- Function implementation
	-- Function enhancement
	# Added
	1. Add a pack function to serialize the uploading file
		-- finished
	2. Add a upload function to handle the uploading process
		-- finished
	3. Add address selection function
		-- finished
	4. Add user-uploading function
		-- finished
	5. Add auto append new upload button function
		-- finished
---
	## 2023.08.18		version 0.1.6 --Announce-build
	-- Function implementation
	-- Rewrite function
	-- Bug fix
	# Added
	1. Add edit function to announce.json excluding attatchment
		-- finished
	# Changed
	1. Merge bright function preocess from uxStyle to uxSelectInit for simplicity
		-- finished
	# Fixed
	1. Fix the highlighted effect not fading after save
		-- finished
---
	## 2023.08.15		version 0.1.5 --Announce-build
	-- Bug fix
	# Fixed
	1. Fix the bug that selected cannot be correctly apply when user hightlighted
		-- finished
	2. Fix the bug that previous selected element color abnormality
		-- finished
---
	## 2023.08.10		version 0.1.4 --Announce-build
	-- Function implementation
	-- Style change
	# Added
	1. Add bright adjustment function to handle glowing effect
		-- finished
	# Changed
	1. Change the colo code from css name to rgb code
		-- finished
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