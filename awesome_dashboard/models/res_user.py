from odoo import models, fields , api

class ResUsers(models.Model):
    _inherit = 'res.users'

    dashboard_disabled_items = fields.Char(string="Disabled Dashboard Items")

    @api.model
    def get_dashboard_disabled_items(self):
        user = self.env.user
        return user.dashboard_disabled_items or ""

    @api.model
    def set_dashboard_disabled_items(self, disabled_items_str):
        user = self.env.user
        user.dashboard_disabled_items = disabled_items_str
        return True