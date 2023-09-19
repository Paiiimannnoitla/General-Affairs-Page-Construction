@@@Road Map
	1. 	Change http to https
	8. 	Selecting style in Announce page
	10. Update the announcement given by colleagues.
	11. Dynamically set style between each page maybe can use some animation
	26. When save should move all related files and template to recycle bin instead of overriding
	30. Remove the warning when download file without https
	36. Make a smooth scroll animation for jump or move operation
		-- announce 
		-- manual
	42. Should add column cut function in Member page
	72. It should be a hint to show the file input area
		-- processing
	73. Hover function-menu should have highlight effect
	74. Set the style of each department in business page
		-- processing
	76. Add delete function to buisness page
		-- processing
---
	## 2023.09.19		version 0.3.8 -- Buisness-build
	-- Style change
	# Changed
	1. Set the document department basic color theme
		-- finished
---
	## 2023.09.18		version 0.3.7 -- Buisness-build
	-- Function enhancement
	-- Style change
	# Added
	1. Switch color theme by select department
		-- finished
	2. Hide and unhide placeholder by check if edit mode on
		-- finished
	# Changed
	1. Set finance department color theme
		-- finished
	# Fixed
	1. Add mutation observer to edit function to ensure table is refreshed after press edit button
		-- finished
---
	## 2023.09.15		version 0.3.6 -- Buisness-build
	-- Function implementation
	-- Infrastructure build
	-- Style change
	# Added
	1. Build the basic structure of business page
		-- finished
	2. Add new job append button
		-- finished
	3. Add department switch function
		-- finished
	# Changed
	1. Set basic style of business page
		-- finished
---
	## 2023.09.15		version 0.3.5 -- Manual-build
	-- Function enhancement
	-- Bug fix
	# Added
	1. Add non-delete flag check to accurate deletion
		-- finished
	# Fixed
	1. Fix the bug that new appended row cannot be edited
		-- finished
---
	## 2023.09.14		version 0.3.4 -- Manual-build
	-- Function implementation
	-- Rewrite function
	# Added
	1. Add upload function to manual page
		-- finished
	2. Add new row append function manual page
		-- finished
	3. Add scroll to the top function to rach department
		-- finished
	# Changed
	1. Rewrite save function in direct way rather than proxy way
		-- finished
---
	## 2023.09.13		version 0.3.3 -- Manual-build
	-- Rewire function
	-- Function implementation
	-- Bug fix
	# Added
	1. Rebuild announce page save and upload function		
		-- finished
	2. Add Upload function to manual page
		-- finished
	# Changed
	1. Rewrite download related function both server and client ends for better dynamics
		-- finished
	# Fixed
	1. Fix the bug that multiple upload fail in announce page
		-- finished
	2. Fix the bug that user cannot download attachment
		-- finished
---
	## 2023.09.12		version 0.3.2.1 -- Manual-build
	-- Function implementation
	-- Bug fix
	# Added
	1. Add uxUploadWriter too handle different case of uploading
		-- finished
	# Fixed
	1. Fix the bug that br cannot be removed
		-- finished
	2. Fix the bug that save function redirect page to normal page from testpage
		-- finished
	3. Apply asynchronous way to uxUploadWriter
		-- finished
	
---
	## 2023.09.11		version 0.3.2 -- Manual-build
	-- Function implementatation
	-- Rewrite function
	-- Clear wasted codes
	-- Style change
	# Added
	1. Add uxCancel function to handle all preparation before save
		-- finished
	2. Rewrite uxSave function for new save mechanism
		-- finished
	3. Add file input auto remove function
		-- finished
	4. Upload files only when saving 
		-- finished
	# Changed
	1. Change the style of dl-link as a general style
		-- finished
	2. Fix the size of border
		-- finished
	3. Reverse the removing order of file input
		-- finished
---
	## 2023.09.08		version 0.3.1 -- Manual-build
	-- Function enhancement
	# Added
	1. Add temporary link before save
		-- finished
---
	## 2023.09.06		version 0.3.0 -- Manual-build
	-- Function enhancement
	-- Rewire function
	-- Style change
	-- Bug fix
	# Added
	1. Add download-proof in edit mode for link selection
		-- finished
	2. Rewire downloaf function to uxDownload
		-- finished
	3. Rewire update button related function to uxUploadSet
		-- finished
	4. Add uxUpload function to handle all uploading process
		-- finished
	# Changed
	1. Add the edit setting uploading setting to Manual page
		-- finished
	# Fixed
	1. Fix the bug that uxLogin may warn when no unedit button
		-- finished
	2. Fix the bug that login status not apply at Manual page
		-- finished
---
	## 2023.09.05		version 0.2.9 -- Manual-build
	-- Bug fix
	-- Style change
	# Changed
	1. Change the overall height and width setting
		-- finished
	2. Set the basic style of Manual page
		-- finished
	# Fixed
	1. Fix the bug that some cells in Manual page display black color when selected
		-- finished
---
	## 2023.09.04		version 0.2.8 -- Manual-build
	-- Bug fix
	-- Style change
	# Fixed
	1. Fix the bug that item-selected effect not removed whild unedit
		-- finished
	# Changed
	1. Adjust basic width and height style
		-- finished
	
---
	## 2023.09.01		version 0.2.7 -- Manual-build
	-- Infrastructure building
	-- Function implementation
	-- Rewrite function
	-- Style change
	# Added
	1. Add basic page of Manual page
		-- finished
	2. Add basic content edit function
		-- finished
	# Chnaged
	1. Change id and name
		-- finished
	2. Basic color palette
		-- finished
	3. Rewrite bright function by remove property
		-- finished
		
---
	## 2023.09.01		version 0.2.6 -- Test-build
	-- Function enhancement
	-- Bug fix
	# Added
	1. Add a title change when test page is loaded
		-- finished
	2. Add test save support to announce and member page
		-- finished
	# Fixed
	1. Fix the bug that test page function not work
		-- finished
	2. Fix the new-btn in announce page will be replaced as movetop-btn
		-- finished
	3. Fix the test page download function by add a new route
		-- finished
	4. Fix the bug warning in test page when no current page
		-- finished
---
	## 2023.08.31		version 0.2.5 -- Test-build
	-- Function implementation
	-- Function enhancement
	-- Style change
	# Added
	1. Add test function for further developing test and operation maintenance
		-- finished
	2. Add test page loading function when press tb-test load current page alternative
		-- finished
	3. Add test off function for leaving test mode
		-- finished
	4. Add save switch function to differentiate test mode and published mode
		-- finished
	# Changed
	1. Change the top bar arrangement for further developing
		-- finished
---
	## 2023.08.31		version 0.2.4 -- Announce-build
	-- Code arrangement
	-- Function implementation
	-- Style change
	-- Bug fix
	# Added
	1. Add Move to the bottom button for quickly scroll to the bottom
		-- finished
	2. Add delete button to Member page
		-- finished
	# Changed
	1. Change the overall style to a more stable way
		-- finished
	2. Add sticky style to all th in table
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