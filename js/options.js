<!DOCTYPE html>
<html>
<head>
    <!-- Only for optionsV2 pages -->
    <base target="_blank">
    <meta charset="utf-8">
    <title>CRX Viewer options</title>
    <style>
        body {
            margin: 2em 3em;
        }
        
        label {
            display: block;
            margin: 1em 0;
            ;
            line-height: 150%;
        }
        
        footer {
            border-top: 1px solid #CCC;
            padding: 1rem 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <label>
    <input type="checkbox" id="hasAccessToAllURLs">
    Allow access to all URLs.<br>
    This option allows the extension to detect Chrome and Opera extensions outside the Chrome Web store.
    This option is also required for viewing the source code of Firefox addons.
</label>
    <label>
    <input type="checkbox" id="contextmenu">
    Add a "View linked extension source" context menu item to Chrome extension and Firefox addon links.
</label>
    <label>
    <a href="crxviewer.html">Open Viewer</a> - select a CRX / NEX / XPI / ZIP file to view its contents.
</label>
    <footer>
        &copy; 2013 - 2016 Rob Wu &lt;rob@robwu.nl&gt; &bull; <a href="https://github.com/Rob--W/crxviewer">Source code on Github</a> &bull; <a href="https://chrome.google.com/webstore/detail/chrome-extension-source-v/jifpbeccnghkjeaalbbjmodiffmgedin">Chrome Web Store listing</a> &bull; <a href="https://addons.opera.com/en/extensions/details/extension-source-viewer/">Opera addon listing</a> &bull; <a href="https://addons.mozilla.org/firefox/addon/crxviewer/">Firefox addon listing</a>
    </footer>
    <script src="storage-sync-polyfill.js"></script>
    <script src="options.js"></script>
</body>
</html>